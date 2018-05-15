/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {logger} from "@atomist/automation-client";
import {
    constructLogPath,
    createEphemeralProgressLog, firstAvailableProgressLog, LoggingProgressLog, ProgressLogFactory,
    RolarProgressLog,
    WriteToAllProgressLog,
} from "@atomist/sdm";

export function logFactory(rolarBaseServiceUrl?: string): ProgressLogFactory {
    let persistentLogFactory = (context, sdmGoal, fallback) => firstAvailableProgressLog(fallback);
    if (rolarBaseServiceUrl) {
        logger.info("Logging with Rolar at " + rolarBaseServiceUrl);
        persistentLogFactory = (context, sdmGoal, fallback) => {
            return firstAvailableProgressLog(
                new RolarProgressLog(rolarBaseServiceUrl, constructLogPath(context, sdmGoal)),
                fallback,
            );
        };
    }
    return async (context, sdmGoal) => {
        const name = sdmGoal.name;
        const persistentLog = await persistentLogFactory(context, sdmGoal, new LoggingProgressLog(name, "info"));
        return new WriteToAllProgressLog(name, await createEphemeralProgressLog(context, sdmGoal), persistentLog);
    };
}

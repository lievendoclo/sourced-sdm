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

import { Configuration } from "@atomist/automation-client";
import {
    MavenFingerprinter,
    SoftwareDeliveryMachine,
} from "@atomist/sdm";
import { AddAtomistJavaHeader } from "../../blueprint/code/autofix/addAtomistHeader";
import { addCheckstyleSupport } from "./checkstyleSupport";

/**
 * Configuration common to Java SDMs, wherever they deploy
 * @param {SoftwareDeliveryMachine} softwareDeliveryMachine
 * @param {{useCheckstyle: boolean}} opts
 */
export function addJavaSupport(softwareDeliveryMachine: SoftwareDeliveryMachine,
                               configuration: Configuration) {
    addCheckstyleSupport(softwareDeliveryMachine, configuration);
    softwareDeliveryMachine
        .addFingerprinterRegistrations(new MavenFingerprinter())
        .addAutofixes(AddAtomistJavaHeader);
}

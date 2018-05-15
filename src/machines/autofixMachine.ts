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
    AutofixGoal,
    Goals,
    onAnyPush,
    SoftwareDeliveryMachine,
    SoftwareDeliveryMachineOptions,
} from "@atomist/sdm";
import {
    AddAtomistJavaHeader,
    AddAtomistTypeScriptHeader,
} from "../blueprint/code/autofix/addAtomistHeader";
import { AddLicenseFile } from "../blueprint/code/autofix/addLicenseFile";
import { addDemoEditors } from "../parts/demo/demoEditors";

/**
 * Assemble a machine that performs only autofixes.
 * @return {SoftwareDeliveryMachine}
 */
export function autofixMachine(options: SoftwareDeliveryMachineOptions,
                               configuration: Configuration): SoftwareDeliveryMachine {

    const sdm = new SoftwareDeliveryMachine("Autofix machine", options,
        onAnyPush
            .setGoals(new Goals("Autofix", AutofixGoal)));
    sdm.addAutofixes(
        AddAtomistJavaHeader,
        AddAtomistTypeScriptHeader,
        AddLicenseFile,
    );

    addDemoEditors(sdm);
    return sdm;
}

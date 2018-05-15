import { ArtifactListenerRegistration } from "@atomist/sdm/common/listener/ArtifactListener";
import { ToDefaultBranch } from "@atomist/sdm/common/listener/support/pushtest/commonPushTests";
import { LoggingProgressLog } from "@atomist/sdm/common/log/LoggingProgressLog";
import {
    asSpawnCommand,
    spawnAndWatch,
} from "@atomist/sdm/util/misc/spawned";

export const OWASPDependencyCheck: ArtifactListenerRegistration = {
    name: "OWASP dependency check",
    pushTest: ToDefaultBranch,
    action: async ali => {
        const command = `dependency-check --project ${ali.deployableArtifact.name} --out . --scan ${ali.deployableArtifact.filename} -f JSON`;
        await spawnAndWatch(
            asSpawnCommand(command),
            {
                cwd: ali.deployableArtifact.cwd,
            },
            new LoggingProgressLog(command),
        );
        await ali.addressChannels(`Dependency check success`);
        // const json = fs.readFileSync(`${ali.deployableArtifact.cwd}/dependency-check-report.json`).toString();
        // await ali.addressChannels(json);
    },
};

import { getInput, setFailed } from '@actions/core';
import { DefaultArtifactClient } from '@actions/artifact';

async function run() {
    try {
        const artifactClient = new DefaultArtifactClient();
        const artifactNames = getInput("names").trim().split("\n");
        const artifactPath = getInput("path");
        for (const artifactName of artifactNames) {
            console.log(`Downloading ${artifactName} to ${artifactPath} ...`);
            const { artifact: targetArtifact } = await artifactClient.getArtifact(artifactName);
            await artifactClient.downloadArtifact(targetArtifact.id, { path: artifactPath });
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();

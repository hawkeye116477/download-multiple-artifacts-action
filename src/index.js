import { getInput, setFailed } from '@actions/core';
import artifact from '@actions/artifact';

async function run() {
    try {
        const artifactClient = artifact.create();
        const artifactNames = getInput("names").trim().split("\n");
        const artifactPath = getInput("path");
        for (const artifactName of artifactNames) {
            console.log(`Downloading ${artifactName} to ${artifactPath} ...`)
            await artifactClient.downloadArtifact(artifactName, artifactPath, { createArtifactFolder: false })
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();

#!/usr/bin/env node
require("dotenv").config();

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();

const BASE_NAME = "AssetDeploy";

const SOURCE_REPO_STRING = "marcoss/deploy-cdk";
const SOURCE_REPO_BRANCH = `main`;

const PARAMETER_STORE_KEY = `/${BASE_NAME}/insecure_github_token`;

// Build asset pipelinet using AWS CLI credentials
new PipelineStack(app, "AssetPipeline", {
  baseName: BASE_NAME,
  sourceRepo: SOURCE_REPO_STRING,
  sourceRepoBranch: SOURCE_REPO_BRANCH,
  parameterStoreKey: PARAMETER_STORE_KEY,
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
  terminationProtection: true,
});

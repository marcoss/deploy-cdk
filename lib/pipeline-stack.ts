import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

export interface PipelineStackProps extends cdk.StackProps {
  baseName: string;
  sourceRepo: string;
  sourceRepoBranch: string;
  parameterStoreKey: string;
}

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, {
      ...props,
      stackName: `${props.baseName}-${id}-stack`,
    });

    const pipeline = new CodePipeline(this, id, {
      pipelineName: id,
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          props.sourceRepo,
          props.sourceRepoBranch,
          {
            // Consider using AWS Secrets Manager if you share the AWS account.
            // This code only uses SSM since it's eligible for the AWS Free Tier.
            authentication: cdk.SecretValue.cfnDynamicReference(
              new cdk.CfnDynamicReference(
                cdk.CfnDynamicReferenceService.SSM,
                props.parameterStoreKey
              )
            ),
          }
        ),
        installCommands: ["npm install -g aws-cdk"],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}

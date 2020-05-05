import { ECS } from "aws-sdk";

const [,,taskDefinition] = process.argv;

const ecs = new ECS();

ecs.describeTaskDefinition(
  {
    taskDefinition,
  },
  (err, res) => {
    if (err) {
      return console.error(
        "error",
        JSON.stringify({ message: err.message, stack: err.stack })
      );
    }

    for (const idx in res.taskDefinition.containerDefinitions) {
      console.log(`=== container ${idx} ===`);

      let container = res.taskDefinition.containerDefinitions[idx];

      for (const env of container.environment) {
        console.log(`${env.name}=${env.value}`);
      }
    }
  }
);

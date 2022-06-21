import "dotenv/config";
import cluster from "cluster";
import { cpus } from "os";
import { app } from "./index";

if (cluster.isPrimary) {
  console.log(`Total number of cpu is ${cpus().length}`);
  for (const _ of cpus()) {
    cluster.fork();
  }
  cluster.on("online", (worker) => {
    console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
  });
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
  });
}
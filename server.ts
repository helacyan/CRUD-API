import { app } from "./index";

const PORT = process.env.PORT

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
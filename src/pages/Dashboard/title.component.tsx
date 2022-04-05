import { useEffect } from "react";

function DashboardTitle() {
  useEffect(() => {
    console.log("Que onda ");
  }, []);

  return <div>Hola</div>;
}

export default DashboardTitle;


import "./styles.css";
import React, { useState, useEffect } from "react";
import { modules } from "./modules";
import {
  markTodayVisited,
  getDaysCount,
  getVisitedDays,
  clearVisitedDays,
  getTodayVisitedModules,
  markModuleVisitedToday
} from "./storage";

function App() {
  const [daysCount, setDaysCount] = useState(0);
  const [visitedModulesToday, setVisitedModulesToday] = useState([]);

  useEffect(() => {
    const visited = getVisitedDays();
    setDaysCount(visited.length);
    setVisitedModulesToday(getTodayVisitedModules());
  }, []);

  const handleModuleClick = (url, moduleId) => {
    markTodayVisited();
    markModuleVisitedToday(moduleId);
    setDaysCount(getDaysCount());
    setVisitedModulesToday(getTodayVisitedModules());
    window.open(url, "_blank");
  };

  const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

  return (
    <div className="container">
        <div className="status">
          {allModulesVisited && (
            <p>{daysCount} day</p>
          )}

      <div className="module-list">
        {modules.map((mod) => {
          const isVisited = visitedModulesToday.includes(mod.id);

          return (
            <button
              key={mod.id}
              className={`module-button ${isVisited ? "visited" : ""}`}
              onClick={() => handleModuleClick(mod.url, mod.id)}
            >
              {mod.name}
            </button>
          );
        })}
      </div>

      </div>
      <div>
        <button
          className="reset"
          onClick={() => {
            clearVisitedDays();
            setDaysCount(0);
            localStorage.removeItem("todayModuleVisits"); // сброс и для модулей
            setVisitedModulesToday([]);
          }}
        >
          Сбросить статистику
        </button>
      </div>
    </div>
  );
}

export default App;


// ПОПЫТКА АВТОРИЗАЦИИ
// import "./styles.css";
// import React, { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import Auth from "./Auth"; // подключаем форму
// import { modules } from "./modules";
// import {
//   markTodayVisited,
//   getDaysCount,
//   getVisitedDays,
//   clearVisitedDays,
//   getTodayVisitedModules,
//   markModuleVisitedToday
// } from "./storage";

// function App() {
//   const [user, setUser] = useState(null);
//   const [daysCount, setDaysCount] = useState(0);
//   const [visitedModulesToday, setVisitedModulesToday] = useState([]);

//   // Проверка авторизации при загрузке
//   useEffect(() => {
//     const getUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (data?.user) setUser(data.user);
//     };
//     getUser();
//   }, []);
//   useEffect(() => {
//     const visited = getVisitedDays();
//     setDaysCount(visited.length);
//     setVisitedModulesToday(getTodayVisitedModules());
//   }, []);

//   // Если не вошёл — показываем форму
//   if (!user) return <Auth onLogin={setUser} />;


//   const handleModuleClick = (url, moduleId) => {
//     markTodayVisited();
//     markModuleVisitedToday(moduleId);
//     setDaysCount(getDaysCount());
//     setVisitedModulesToday(getTodayVisitedModules());
//     window.open(url, "_blank");
//   };

//   const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

//   return (
//     <div className="container">
//       <div className="status">
//         {allModulesVisited && (
//           <p>📅 Ты занимаешься уже {daysCount} {daysCount === 1 ? "день" : "дней"}</p>
//         )}

//         <div className="module-list">
//           {modules.map((mod) => {
//             const isVisited = visitedModulesToday.includes(mod.id);

//             return (
//               <button
//                 key={mod.id}
//                 className={`module-button ${isVisited ? "visited" : ""}`}
//                 onClick={() => handleModuleClick(mod.url, mod.id)}
//               >
//                 {mod.name}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//       <div>
//         <button
//           className="reset"
//           onClick={() => {
//             clearVisitedDays();
//             setDaysCount(0);
//             localStorage.removeItem("todayModuleVisits");
//             setVisitedModulesToday([]);
//           }}
//         >
//           Сбросить статистику
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

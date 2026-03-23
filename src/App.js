

// import "./styles.css";
// import React, { useState, useEffect } from "react";
// import { modules } from "./modules";
// import {
//   markTodayVisited,
//   getDaysCount,
//   getVisitedDays,
//   clearVisitedDays,
//   getTodayVisitedModules,
//   markModuleVisitedToday
// } from "./storage";
// import BackupControls from './BackupControls';

// // Функция для перестройки массива под колонки (сверху вниз)
// function reorderForColumns(array, columns) {
//   const result = [];
//   const rows = Math.ceil(array.length / columns);

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < columns; c++) {
//       const idx = c * rows + r;
//       if (array[idx]) result.push(array[idx]);
//     }
//   }
//   return result;
// }

// function App() {
//   const [daysCount, setDaysCount] = useState(0);
//   const [visitedModulesToday, setVisitedModulesToday] = useState([]);

//   useEffect(() => {
//     const visited = getVisitedDays();
//     setDaysCount(visited.length);
//     setVisitedModulesToday(getTodayVisitedModules());
//   }, []);

//   const handleModuleClick = (url, moduleId) => {
//     markTodayVisited();
//     markModuleVisitedToday(moduleId);
//     setDaysCount(getDaysCount());
//     setVisitedModulesToday(getTodayVisitedModules());
//     window.open(url, "_blank");
//   };

//   const allModulesVisited = modules.every(mod => visitedModulesToday.includes(mod.id));

//   // Перестраиваем массив для колонок сверху вниз
//   const modulesColumnWise = reorderForColumns(modules, 4);

//   return (
//     <div className="container">
//       <strong style={{ fontFamily: 'HarryP, sans-serif', fontSize: '48px' }}>
//         OASIS
//       </strong>

//       <br /><br />

//       <div className="status">
//         {allModulesVisited && (
//           <p>{daysCount} days</p>
//         )}

//         <div className="module-list">
//           {modulesColumnWise.map((mod) => {
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

//       <BackupControls />

//     </div>
//   );
// }

// export default App;

// App.js
// App.js
import "./styles.css";
import React, { useState, useEffect } from "react";
import { modules } from "./modules";
import {
  markTodayVisited,
  getDaysCount,
  getVisitedDays,
  getTodayVisitedModules,
  markModuleVisitedToday
} from "./storage";
import BackupControls from './BackupControls';

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

  // Просто берем порядок из modules.js
  const modulesColumnWise = modules;

  return (
    <div className="container">
      <strong style={{ fontFamily: 'HarryP, sans-serif', fontSize: '48px' }}>
        OASIS
      </strong>

      <br /><br />

      <div className="status">
        {allModulesVisited && (
          <p>{daysCount} days</p>
        )}

        <div className="module-list">
          {modulesColumnWise.map((mod) => {
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

      <BackupControls />
    </div>
  );
}

export default App;
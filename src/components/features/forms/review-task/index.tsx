// import { Button } from "@chakra-ui/react";
// import React, { useState } from "react";

// import { BaseProps, RejectTaskDto, VerifyTaskDto } from "./models";
// import {
//   SmartContractService,
//   getSmartContractService,
// } from "./smartContractService";

// const TaskReviewForm: React.FC<BaseProps> = (props) => {
//   const [projectId, setProjectId] = useState<number | "">("");
//   const [student, setStudent] = useState<string>("");
//   const [grade, setGrade] = useState<number | "">("");
//   const [service] = useState<SmartContractService>(
//     getSmartContractService(props.connectedAccount)
//   );

//   const handleVerify = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (projectId === "" || student.trim() === "" || grade === "") return;

//     const verifyData: VerifyTaskDto = {
//       projectId: Number(projectId),
//       student,
//       grade: Number(grade),
//     };

//     console.log("Verifying:", verifyData);
//     await service.verifyTask(verifyData);
//   };

//   const handleReject = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (projectId === "" || student.trim() === "") return;

//     const rejectData: RejectTaskDto = {
//       projectId: Number(projectId),
//       student,
//     };

//     console.log("Rejecting:", rejectData);
//     await service.rejectTask(rejectData);
//   };

//   return (
//     <form style={{ background: "purple", padding: "20px" }}>
//       <div>
//         <label>Project ID:</label>
//         <input
//           type="number"
//           value={projectId}
//           onChange={(e) =>
//             setProjectId(e.target.value ? Number(e.target.value) : "")
//           }
//         />
//       </div>

//       <div>
//         <label>Student:</label>
//         <input
//           type="text"
//           value={student}
//           onChange={(e) => setStudent(e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Grade (only for verification):</label>
//         <input
//           type="number"
//           value={grade}
//           onChange={(e) =>
//             setGrade(e.target.value ? Number(e.target.value) : "")
//           }
//         />
//       </div>

//       <Button type="submit" onClick={handleVerify}>
//         Verify
//       </Button>

//       <Button type="submit" onClick={handleReject}>
//         Reject
//       </Button>
//     </form>
//   );
// };

// export default TaskReviewForm;

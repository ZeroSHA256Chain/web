import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { BaseProps } from "./models";
import {
  SmartContractService,
  getSmartContractService,
} from "./smartContractService";

const AddProjectForm: React.FC<BaseProps> = ({ connectedAccount }) => {
  const [repo] = useState<SmartContractService>(
    getSmartContractService(connectedAccount)
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    timestamp: Math.floor(Date.now() / 1000), // Default: current UNIX time
    allowResubmission: false,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle checkbox separately
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as any)["checked"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    await repo.createProject({
      name: formData.name,
      description: formData.description,
      deadline: 1739789181,
      allowResubmission: formData.allowResubmission,
      allowedStudents: [],
      verifiers: [],
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      timestamp: Math.floor(Date.now() / 1000),
      allowResubmission: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: "green", padding: "30px" }}
    >
      <label>
        Project Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          name="allowResubmission"
          checked={formData.allowResubmission}
          onChange={handleChange}
        />
        Allow Resubmission
      </label>

      <br />

      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default AddProjectForm;

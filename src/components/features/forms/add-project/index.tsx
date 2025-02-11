import { Button } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { useState } from "react";

import { DatePicker } from "@/components/ui";
import { smartContractServiceAtom } from "@/store/atoms";

interface AddProjectFormProps {}

export const AddProjectForm: React.FC<AddProjectFormProps> = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    timestamp: Math.floor(Date.now() / 1000), // Default: current UNIX time
    allowResubmission: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // Handle checkbox separately
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "checkbox"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: (event.target as any)["checked"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    if (!service) return;

    event.preventDefault(); // Prevent page reload

    await service.createProject({
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
      <DatePicker onChange={(date) => set} } value={undefined} placeholder={""}      />
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

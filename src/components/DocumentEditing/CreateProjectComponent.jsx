import { Box, Modal } from "@mui/material";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Plus, X, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { FileUploadIcons } from "../icons/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useApiPost } from "@/hooks/useApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1200,
  width: "95vw",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  outline: "none",
  borderRadius: "8px",
  overflowY: "auto",
  maxHeight: "100dvh",
};

const CreateProjectComponent = ({ handleClose, open = false, refetch }) => {
  // Basic project info states
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectObjectives, setProjectObjectives] = useState("");
  const [projectTimeline, setProjectTimeline] = useState("");
  const [dueDate, setDueDate] = useState();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Members states
  const [members, setMembers] = useState([]);
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");

  // Milestones states
  const [milestones, setMilestones] = useState([]);
  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneDueDate, setMilestoneDueDate] = useState();

  // Files state
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const user = useSelector((state) => state.user);
  const { post, isLoading } = useApiPost();

  // Validation logic
  const isFormValid = useMemo(() => {
    return (
      projectName.trim() &&
      projectDescription.trim() &&
      dueDate &&
      priority &&
      projectObjectives.trim() &&
      projectTimeline.trim() &&
      members.length > 0 &&
      milestones.length > 0
    );
  }, [
    projectName,
    projectDescription,
    dueDate,
    priority,
    projectObjectives,
    projectTimeline,
    members,
    milestones,
  ]);

  // Helper function to get error styling
  const getFieldErrorClass = (fieldValue, isArray = false) => {
    if (isArray) {
      return fieldValue.length === 0 ? " " : "";
    }
    return !fieldValue || (typeof fieldValue === "string" && !fieldValue.trim())
      ? " "
      : "";
  };

  const addMember = () => {
    if (memberFirstName.trim() && memberLastName.trim() && memberEmail.trim()) {
      setMembers([
        ...members,
        {
          firstName: memberFirstName.trim(),
          lastName: memberLastName.trim(),
          email: memberEmail.trim(),
          phone: memberPhone.trim() || "",
        },
      ]);
      setMemberFirstName("");
      setMemberLastName("");
      setMemberEmail("");
      setMemberPhone("");
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMember();
    }
  };

  const addMilestone = () => {
    if (
      milestoneName.trim() &&
      milestoneDescription.trim() &&
      milestoneDueDate
    ) {
      setMilestones([
        ...milestones,
        {
          name: milestoneName.trim(),
          description: milestoneDescription.trim(),
          dueDate: milestoneDueDate,
        },
      ]);
      setMilestoneName("");
      setMilestoneDescription("");
      setMilestoneDueDate();
    }
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    e.target.value = ""; // Reset input
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!projectName.trim()) {
      alert("Project name is required");
      return;
    }
    if (!projectDescription.trim()) {
      alert("Project description is required");
      return;
    }
    if (!dueDate) {
      alert("Due date is required");
      return;
    }
    if (!priority) {
      alert("Priority level is required");
      return;
    }
    if (!projectObjectives.trim()) {
      alert("Project objectives is required");
      return;
    }
    if (!projectTimeline.trim()) {
      alert("Project timeline is required");
      return;
    }
    if (members.length === 0) {
      alert("At least one assigned member is required");
      return;
    }
    if (milestones.length === 0) {
      alert("At least one project milestone is required");
      return;
    }

    // Create FormData object matching your Postman structure exactly
    const apiFormData = new FormData();

    // Add basic project info
    apiFormData.append("project_name", projectName);
    apiFormData.append("project_description", projectDescription);
    apiFormData.append("due_date", format(dueDate, "yyyy-MM-dd"));
    apiFormData.append("priority_level", priority);
    apiFormData.append("project_objectives", projectObjectives);
    apiFormData.append("project_timeline", projectTimeline);

    // Add members exactly as shown in Postman
    members.forEach((member, index) => {
      apiFormData.append(
        `assigned_members[${index}][first_name]`,
        member.firstName
      );
      apiFormData.append(
        `assigned_members[${index}][last_name]`,
        member.lastName
      );
      apiFormData.append(`assigned_members[${index}][email]`, member.email);
      apiFormData.append(
        `assigned_members[${index}][phone]`,
        member.phone || ""
      );
    });

    // Add milestones exactly as shown in Postman
    milestones.forEach((milestone, index) => {
      apiFormData.append(
        `project_milestones[${index}][milestone_name]`,
        milestone.name
      );
      apiFormData.append(
        `project_milestones[${index}][milestone_description]`,
        milestone.description
      );
      apiFormData.append(
        `project_milestones[${index}][due_date]`,
        format(milestone.dueDate, "yyyy-MM-dd")
      );
    });

    // Add files exactly as shown in Postman
    uploadedFiles.forEach((fileObj, index) => {
      apiFormData.append(`documents[${index}]`, fileObj.file);
    });

    // Log the FormData contents (for debugging)
    console.log("FormData contents:");
    for (const [key, value] of apiFormData.entries()) {
      console.log(key, value);
    }

    try {
      // Use your custom hook with the FormData
      const result = await post(
        "projects/generate-contract",
        apiFormData,
        false
      );

      if (result) {
        console.log("Project created successfully:", result);
        // Reset form
        setProjectName("");
        setProjectDescription("");
        setProjectObjectives("");
        setProjectTimeline("");
        setDueDate(null);
        setStatus("");
        setPriority("");
        setMembers([]);
        setMilestones([]);
        setUploadedFiles([]);
        handleClose();
        if (refetch) refetch();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" mx-auto   ">
          <Card className="w-full border-none p-0">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* First Row - Status, Due Date, Priority Level */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Status */}
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-2">
                    <Label>
                      Due Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${getFieldErrorClass(
                            dueDate
                          )}`}
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[9999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Priority Level */}
                  <div className="space-y-2">
                    <Label>
                      Priority Level <span className="text-red-500">*</span>
                    </Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className={getFieldErrorClass(priority)}>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Assigned Members */}
                <div className="space-y-4 mb-6">
                  <Label>
                    Assigned Members <span className="text-red-500">*</span>
                  </Label>

                  {/* Add Member Form */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <Input
                      placeholder="First name"
                      value={memberFirstName}
                      onChange={(e) => setMemberFirstName(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Input
                      placeholder="Last name"
                      value={memberLastName}
                      onChange={(e) => setMemberLastName(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Input
                      placeholder="Member email"
                      type="email"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Input
                      placeholder="Phone (optional)"
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      type="button"
                      onClick={addMember}
                      disabled={
                        !memberFirstName.trim() ||
                        !memberLastName.trim() ||
                        !memberEmail.trim()
                      }
                      className="w-full max-w-[150px] md:w-auto bg-[#0A0A78]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </div>

                  {/* Display Added Members */}
                  {members.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Added Members:
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {members.map((member, index) => (
                          <div
                            key={index}
                            className="flex bg-[#edf1ff] justify-between gap-4 border min-w-[150px] relative p-1.5 rounded-full  items-center "
                          >
                            <div className="flex flex-row items-center gap-2">
                              <span className="font-medium p-2 text-[#fff] aspect-square bg-[#0A0A78] rounded-full text-xs">
                                {(member.firstName + member.lastName)
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {member.email}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4   w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => removeMember(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show error message for members */}
                  {members.length === 0 && (
                    <div className="text-red-500 text-sm">
                      At least one member is required
                    </div>
                  )}
                </div>

                {/* Project Name */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="project-name">
                    Project Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name"
                    className={`w-full ${getFieldErrorClass(projectName)}`}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {/* Brief Description */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="description">
                    Brief Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add Description"
                    className={`min-h-[100px] resize-none ${getFieldErrorClass(
                      projectDescription
                    )}`}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                {/* Second Row - Objectives and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Objectives */}
                  <div className="space-y-2">
                    <Label htmlFor="objectives">
                      Objectives <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="objectives"
                      placeholder="Add Description"
                      className={`min-h-[100px] resize-none ${getFieldErrorClass(
                        projectObjectives
                      )}`}
                      value={projectObjectives}
                      onChange={(e) => setProjectObjectives(e.target.value)}
                    />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label htmlFor="timeline">
                      Timeline <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="timeline"
                      placeholder="Add Timeline"
                      className={`min-h-[100px] resize-none ${getFieldErrorClass(
                        projectTimeline
                      )}`}
                      value={projectTimeline}
                      onChange={(e) => setProjectTimeline(e.target.value)}
                    />
                  </div>
                </div>

                {/* Milestone Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">
                      Milestone Breakdown{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  {/* Add Milestone Form */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#f3f3fd] rounded-lg">
                    <Input
                      placeholder="Milestone name"
                      value={milestoneName}
                      onChange={(e) => setMilestoneName(e.target.value)}
                    />
                    <Input
                      placeholder="Description"
                      value={milestoneDescription}
                      onChange={(e) => setMilestoneDescription(e.target.value)}
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full bg-[#fff] justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {milestoneDueDate
                            ? format(milestoneDueDate, "PPP")
                            : "Due date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[9999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={milestoneDueDate}
                          onSelect={setMilestoneDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button
                      type="button"
                      onClick={addMilestone}
                      disabled={
                        !milestoneName.trim() ||
                        !milestoneDescription.trim() ||
                        !milestoneDueDate
                      }
                      className="bg-[#0A0A78]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>

                  {/* Milestones Table */}
                  {milestones.length > 0 && (
                    <div className=" ">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#DEDEED]">
                              <TableHead className="font-medium text-sm text-black">
                                Milestone
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                Due Date
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                Description
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {milestones.map((milestone, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div
                                    className="truncate max-w-[120px] md:max-w-none"
                                    title={milestone.name}
                                  >
                                    {milestone.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                  <div className="whitespace-nowrap">
                                    {format(milestone.dueDate, "MMM dd, yyyy")}
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                  <div
                                    className="truncate max-w-[150px] md:max-w-none"
                                    title={milestone.description}
                                  >
                                    {milestone.description}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeMilestone(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* Show error message for milestones */}
                  {milestones.length === 0 && (
                    <div className="text-red-500 text-sm">
                      At least one milestone is required
                    </div>
                  )}
                </div>

                {/* Document and File Upload */}
                <div className="space-y-4 mb-6">
                  <Label className="text-lg font-semibold">
                    Document and File Upload
                  </Label>

                  {uploadedFiles.length > 0 && (
                    <div className=" ">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#DEDEED]">
                              <TableHead className="font-medium text-sm text-black">
                                File
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                {" "}
                                Date Uploaded
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                Uploaded by
                              </TableHead>
                              <TableHead className="font-medium text-sm text-black">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {uploadedFiles.map((fileObj, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <FileUploadIcons />
                                    <div className="flex flex-col">
                                      <div
                                        className="truncate max-w-[120px] md:max-w-[300px]"
                                        title={fileObj.name}
                                      >
                                        {fileObj.name}
                                      </div>
                                      <div className="text-[10px]">
                                        {formatFileSize(fileObj.size)}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                  <div className="whitespace-nowrap">
                                    {format(fileObj.uploadedAt, "MMM dd, yyyy")}
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                  <div className="flex gap-2 items-center">
                                    <div className="w-8 flex justify-center items-center h-8 bg-[#0A0A78] text-white aspect-square rounded-full">
                                      {user?.email?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    <div className="truncate max-w-[150px] md:max-w-none">
                                      {user?.email || "Unknown User"}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* File Upload Area */}
                  <div className="m-auto max-w-[400px]">
                    <div className="border-2 flex flex-col items-center justify-center gap-2  border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileUploadIcons />
                      <div className="space-y-2">
                        <div
                          onClick={() =>
                            document.getElementById("file-upload").click()
                          }
                          className=" cursor-pointer underline text-[#0A0A78] font-[600] "
                        >
                          {" "}
                          Choose File
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
                        />
                      </div>
                    </div>
                    <div className="text-[11px] justify-between gap-2 flex-wrap mt-2 flex text-gray-500">
                      <div>
                        Supported Format: PNG, JPEG, PDF, DOC, DOCX, TXT
                      </div>
                      <div>Maximum Size: 25mb</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-2 pt-4">
                  <Button
                    type="button"
                    onClick={() => handleClose()}
                    variant="outline"
                    className="min-w-[150px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0A0A78] min-w-[150px]"
                    disabled={isLoading || !isFormValid}
                  >
                    {isLoading ? "Submitting..." : "Submit Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateProjectComponent;

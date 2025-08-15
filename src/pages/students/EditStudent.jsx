import httpClient from "@/utils/httpClinet";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

const startYear = 2008;
const years = Array.from({ length: 30 }, (_, i) => startYear + i);

const EditStudent = () => {
  const [formData, setFormData] = useState({
    schoolID: "",
    class_year: "",
    vocational_school: "",
    firstname: "",
    middle: "",
    lastname: "",
    // informalName: "",
    address_type: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone1: "",
    cell: "",
    email: "",
    password: "",
    textable: "",
    height: "",
    weight: "",
    gender: "",
    comments: "",
    wid: "hj-westtampa",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

 

  const handleChange = (field) => (e) => {
    console.log(field, e.target.value);
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.schoolID) newErrors.schoolID = "School is required";
    if (!formData.class_year) newErrors.class_year = "Class year is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.address_type)
      newErrors.address_type = "Address type is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "Zip is required";
    if (!formData.phone1) newErrors.phone1 = "Phone is required";
    if (!formData.cell) newErrors.cell = "Cell number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateStudent = () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fill all the required fields", {
        variant: "error",
      });
      return;
    }

    console.log("add student data => ", formData);
    setLoading(true);
    httpClient
      .post(`/student/add-new-student`, formData)
      .then((res) => {
        console.log("add student res => ", res);
        enqueueSnackbar("Student added successfully", {
          variant: "success",
        });
        navigate(-1);
      })
      .catch((err) => {
        console.log("add student err => ", err);
        enqueueSnackbar(err.response?.data?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    httpClient
      .get(`/student/get-by-id/${params.id}`)
      .then((res) => {
        console.log("get student res => ", res);
        setFormData(res.data?.data);
      })
      .catch((err) => {
        console.log("get student err => ", err);
        enqueueSnackbar(err.response?.data?.message, {
          variant: "error",
        });
      });
  }, [params.id]);

  useEffect(() => {
    httpClient
      .get("/school/get-all-school/hj-tampa")
      .then((res) => setSchoolList(res.data?.data || []))
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="">
      <Box>
        <Box
          component="form"
          sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
        >
          <FormControl
            sx={{ flex: "1 1 300px" }}
            error={!!errors.school}
            required
          >
            <InputLabel>School</InputLabel>
            <Select
              value={formData.schoolID}
              label="School"
              onChange={handleChange("schoolID")}
            >
              {schoolList.map((school) => (
                <MenuItem
                  key={school?.schoolID}
                  id={school?.schoolID}
                  value={school?.schoolID}
                >
                  {school?.school_name}
                </MenuItem>
              ))}
            </Select>
            {errors.school && (
              <Typography color="error" variant="caption">
                {errors.school}
              </Typography>
            )}
          </FormControl>

          <FormControl
            sx={{ flex: "1 1 200px" }}
            error={!!errors.classYear}
            required
          >
            <InputLabel>Class Year</InputLabel>
            <Select
              value={formData.class_year}
              label="Class Year"
              onChange={handleChange("class_year")}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            {errors.class_year && (
              <Typography color="error" variant="caption">
                {errors.class_year}
              </Typography>
            )}
          </FormControl>
          {/* <FormControl
            sx={{ flex: "1 1 200px" }}
            error={!!errors.classYear}
            required
          >
            <InputLabel>Address Type</InputLabel>
            <Select
              value={formData.address_type}
              label="Address Type"
              onChange={handleChange("address_type")}
            >
              <MenuItem key={"billing_address"} value={" Billing Address"}>
                Billing Address
              </MenuItem>
              <MenuItem key={"shipping_address"} value={"Shipping Address"}>
                Shipping Address
              </MenuItem>
              <MenuItem key={"permanent_address"} value={"Permanent Address"}>
                Permanent Address
              </MenuItem>
            </Select>
            {errors.address_type && (
              <Typography color="error" variant="caption">
                {errors.address_type}
              </Typography>
            )}
          </FormControl> */}

          {[
            { name: "vocationalSchool", label: "Vocational School" },
            { name: "firstname", label: "First Name", required: true },
            { name: "middle", label: "Middle Name" },
            { name: "lastname", label: "Last Name", required: true },
            // { name: "informalName", label: "Informal Name" },
            { name: "address1", label: "Address 1" },
            { name: "address2", label: "Address 2" },
            { name: "city", label: "City", required: true },
            { name: "state", label: "State", required: true },
            { name: "zip", label: "Zip", required: true },
            { name: "phone1", label: "Phone", required: true },
            { name: "cell", label: "Cell Number", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            {
              name: "password",
              label: "Password",
              type: "password",
              required: true,
            },
            { name: "height", label: "Height" },
            { name: "weight", label: "Weight (e.g. 175)" },
          ].map(({ name, label, type = "text", required }) => (
            <TextField
              key={name}
              label={label}
              type={type}
              sx={{ flex: "1 1 250px" }}
              value={formData[name]}
              onChange={handleChange(name)}
              required={required}
              error={!!errors[name]}
              helperText={errors[name] || ""}
            />
          ))}

          <FormControl sx={{ flex: "1 1 300px" }} error={!!errors.textable}>
            <InputLabel>Textable</InputLabel>
            <Select
              value={formData.textable == 1 ? "Yes" : "No"}
              label="Textable"
              onChange={handleChange("textable")}
            >
              <MenuItem value="Yes">Yes - I authorize</MenuItem>
              <MenuItem value="No">No - I don't authorize</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: "1 1 300px" }} error={!!errors.gender}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              value={formData.gender}
              onChange={handleChange("gender")}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            {errors.gender && (
              <Typography color="error" variant="caption">
                {errors.gender}
              </Typography>
            )}
          </FormControl>
          <TextField
            key={"name"}
            label={"Comments"}
            type={"text"}
            sx={{ flex: "1 1 250px" }}
            // value={formData[name]}
            onChange={handleChange("comments")}
          />

          <Box
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "center",
              mt: 3,
              gap: 2,
            }}
          >
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={updateStudent}
            >
              {/* Save And Create Order */}
              Save Student
            </LoadingButton>
            {/* <LoadingButton
              variant="contained"
              loading={loading}
            //   onClick={updateStudent}
            >
              Save And Create Ring
            </LoadingButton> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EditStudent;

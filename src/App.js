import React, { useState } from "react";
import * as Yup from "yup"; 

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [submittedData, setSubmittedData] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama lengkap wajib diisi"),
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Kata sandi minimal 6 karakter")
      .required("Kata sandi wajib diisi"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Konfirmasi kata sandi harus sama")
      .required("Konfirmasi kata sandi wajib diisi"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({}); 
      setSubmittedData(formData); 
      alert("Registrasi berhasil!"); 
      console.log("Data berhasil disimpan:", formData); 
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Registrasi</h2>
      <form onSubmit={handleSubmit}>
        {/* Input Nama */}
        <div>
          <label>Nama Lengkap:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        {/* Input Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* Input Password */}
        <div>
          <label>Kata Sandi:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        {/* Input Konfirmasi Password */}
        <div>
          <label>Konfirmasi Kata Sandi:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>

        {/* Tombol Submit */}
        <button type="submit">Daftar</button>
      </form>

      {/* Komponen untuk data yang berhasil dikirim */}
      {submittedData && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Data Registrasi:</h3>
          <p><strong>Nama:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

export default App;

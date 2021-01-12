import React, { useState,useEffect } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createCategory,
    getCategories,
  } from "../../functions/category";
import CategoryForm from "../../components/forms/CategoryForm";


const CreateCategoryModal = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const showModal = () => {
    setVisible(true);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
  
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
     
        setName("");
        toast.success(`"${res.data.name}" is created`);
       
      })
      .catch((err) => {
        console.log(err);
        
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <>
    <Button type="primary" onClick={showModal}>
        Añadir Categoría
      </Button>
      <Modal
        title="Crear Categoría"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
          getCategories();
          toast.success("Creaste una Nueva Categoría");
        }}
        onCancel={() => setVisible(false)}
      >
        <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
        />
      </Modal>
    </>
  );
};

export default CreateCategoryModal;

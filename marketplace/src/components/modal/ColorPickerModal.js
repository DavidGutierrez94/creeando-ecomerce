import React, { useState} from "react";
import { Modal, Button } from "antd";
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';


const ColorPickerModal = (color, handleChangeComplete) => {

  const [visible, setVisible] = useState(false);
  const [c,setC] = useState()



  const showModal = () => {
    setVisible(true);
  };

  

  return (
    <>
    <Button type="secondary" onClick={showModal}>
        Añadir Color primario
      </Button>
      <Modal
        title="Crear Categoría"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);

        }}
        onCancel={() => setVisible(false)}
      >
        <SketchPicker
        onChange={(co) =>{
          setC(co)
        }}
          color={c?.hex}
            onChangeComplete={ handleChangeComplete }
        />
      </Modal>
    </>
  );
};

export default ColorPickerModal;

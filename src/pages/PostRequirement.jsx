import { useState } from "react";
import m from "../assets/css/componentes/PostRequirement.module.css";
import axios from "axios";

export default function PostRequirement() {
  const [dataReq, setDataReq] = useState({
    title: "",
    metadescription: "",
    body: "",
    categoria: "",
    subcategoria: "",
    emailCliente: "",
    emailDesarrollador: "",
  });

  function handleChangue(event) {
    const { name, value } = event.target;
    setDataReq({ ...dataReq, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(`http://localhost:3001/findUser?email=${dataReq.emailCliente}`)
      .then(({ data }) => data)
      .then((data) => {
        if (!data.status) throw alert(`No existe ${dataReq.emailCliente}`);
        if (!data.userFind.cliente)
          throw alert(`${dataReq.emailCliente} existe pero no es un cliente`);

        const idCliente = data.userFind.id;
        const requerimientosCliente = data.userFind.requerimientos;

        axios
          .get(
            `http://localhost:3001/findUser?email=${dataReq.emailDesarrollador}`
          )
          .then(({ data }) => data)
          .then((data) => {
            if (!data.status)
              throw alert(`No existe ${dataReq.emailDesarrollador}`);
            if (!data.userFind.desarrollador)
              throw alert(
                `${dataReq.emailDesarrollador} existe pero no es un desarrollador`
              );

            const idDesarrollador = data.userFind.id;
            const requerimientosDesarrollador = data.userFind.requerimientos;

            axios.put(`http://localhost:3001/reqUserUpdate`, {
              id: idCliente,
              requerimientos: [...requerimientosCliente, dataReq],
            });
            axios.put(`http://localhost:3001/reqUserUpdate`, {
              id: idDesarrollador,
              requerimientos: [...requerimientosDesarrollador, dataReq],
            });

            alert(
              "Las asignaciones(falta) y el requerimiento han sido creados"
            );
          });
      });
  }

  console.log(dataReq);

  return (
    <form className={m.mainDiv} onSubmit={handleSubmit}>
      <label htmlFor="">Título</label>
      <input
        type="text"
        name="title"
        value={dataReq.title}
        onChange={handleChangue}
      />

      <label htmlFor="">Metadescripción</label>
      <textarea
        type="text"
        name="metadescription"
        value={dataReq.metadescription}
        onChange={handleChangue}
      />

      <label htmlFor="">Cuerpo</label>
      <textarea
        type="text"
        name="body"
        value={dataReq.body}
        onChange={handleChangue}
      />

      <label htmlFor="">Categoría</label>
      <input
        type="text"
        name="categoria"
        value={dataReq.categoria}
        onChange={handleChangue}
      />

      <label htmlFor="">Subcategoria</label>
      <input
        type="text"
        name="subcategoria"
        value={dataReq.subcategoria}
        onChange={handleChangue}
      />

      <label htmlFor="">Del cliente:</label>
      <input
        type="text"
        name="emailCliente"
        value={dataReq.emailCliente}
        placeholder="email..."
        onChange={handleChangue}
      />

      <label htmlFor="">Asignar al desarrolador</label>
      <input
        type="text"
        name="emailDesarrollador"
        value={dataReq.emailDesarrollador}
        placeholder="email..."
        onChange={handleChangue}
      />

      <button className={m.button}>Guardar</button>
    </form>
  );
}

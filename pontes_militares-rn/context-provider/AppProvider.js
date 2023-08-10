import React, { useState } from "react";

import AppContext from "./AppContext.js";

export const AppProvider = ({ children }) => {
  const [relNum, setRelNum] = useState("1");
  const [grpDataHora, setGrpDataHora] = useState("101800 Jun 20");
  const [nomePostoGrad, setNomePostoGrad] = useState(
    "2° Ten JOÃO / 10º BE Cmb"
  );
  const [para, setPara] = useState("S3 - 10º BE Cmb");
  const [nomeNr, setNomeNr] = useState("RSC - 287");
  const [grpDataHoraRec, setGrpDataHoraRec] = useState("10 0600 JUN 20");
  const [cartaEscalaReg, setCartaEscalaReg] = useState(
    "CANDELÁRIA - 1: 50 000"
  );
  const [contatoInimigo, setContatoInimigo] = useState("");
  const [condMetTempo, setCondMetTempo] = useState(
    "CÉU CLARO COM POUCAS NUVENS"
  );
  const [condMetTemperatura, setCondMetTemperatura] = useState(
    "MÁX 27° C / MÍN 12° C"
  );
  const [condMetChuva, setCondMetChuva] = useState("01/JUN/20");

  const [locGeog, setLocGeog] = useState("");
  const [gabarito, setGabarito] = useState("");
  const [distPAltTransp, setDistPAltTransp] = useState("");
  const [altNivAgua, setAltNivAgua] = useState("");
  const [sitInfraSuper, setSitInfraSuper] = useState("");

  const [varl, setl] = useState();
  const [varlu, setlu] = useState();
  const [vart, sett] = useState();
  const [vard, setd] = useState();
  const [vars, sets] = useState();
  const [varb, setb] = useState();
  const [varnv, setnv] = useState();
  const [varn, setn] = useState();
  const [m1, setm1] = useState();
  const [m2, setm2] = useState();
  const [classeR1, setClasseR1] = useState();
  const [classeL1, setClasseL1] = useState();
  const [classeR2, setClasseR2] = useState();
  const [classeL2, setClasseL2] = useState();

  return (
    <AppContext.Provider
      value={{
        relNum,
        setRelNum,
        grpDataHora,
        setGrpDataHora,
        nomePostoGrad,
        setNomePostoGrad,
        para,
        setPara,
        nomeNr,
        setNomeNr,
        grpDataHoraRec,
        setGrpDataHoraRec,
        cartaEscalaReg,
        setCartaEscalaReg,
        contatoInimigo,
        setContatoInimigo,
        condMetTempo,
        setCondMetTempo,
        condMetTemperatura,
        setCondMetTemperatura,
        condMetChuva,
        setCondMetChuva,

        locGeog,
        setLocGeog,
        gabarito,
        setGabarito,
        distPAltTransp,
        setDistPAltTransp,
        altNivAgua,
        setAltNivAgua,
        sitInfraSuper,
        setSitInfraSuper,

        varl,
        setl,
        varlu,
        setlu,
        vart,
        sett,
        vard,
        setd,
        vars,
        sets,
        varb,
        setb,
        varnv,
        setnv,
        varn,
        setn,
        m1,
        setm1,
        m2,
        setm2,
        classeR1,
        setClasseR1,
        classeL1,
        setClasseL1,
        classeR2,
        setClasseR2,
        classeL2,
        setClasseL2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

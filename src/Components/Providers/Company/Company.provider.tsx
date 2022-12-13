import React, {createContext, useContext, useEffect, useState} from "react";
import {Company, defaultCompany} from "../../../services/companies.services";
import {getCookie, setCookie} from "../../../services/connectors/cookies";
import {useNavigate} from "react-router-dom";

type CompanyContextType = {
  company?: Company,
  setCompany?: React.Dispatch<React.SetStateAction<Company>>
}
export const useCompanyContext = createContext<CompanyContextType>({
  company: defaultCompany,
  setCompany: () => {
  }
});


export function CompanyProvider(props: { children: React.ReactNode }) {
  const [company, setCompany] = useState({});
  const companyValue = {company, setCompany};
  const navigate = useNavigate();

  useEffect(() => {
    if (!company) {
      navigate('/app/companies')
      setCookie('company', JSON.stringify({}), 1)
    }

    try {
      const currentCompany: Company = JSON.parse(getCookie('company'))
      setCompany(currentCompany)
    } catch (err) {
      console.log(err)
    }

  }, [])

  return (
    <useCompanyContext.Provider value={companyValue}>
      {props.children}
    </useCompanyContext.Provider>
  );
}

export const useCurrentCompany = () => useContext(useCompanyContext);


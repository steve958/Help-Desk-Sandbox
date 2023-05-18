import { useState, useEffect, useRef } from "react";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import CompaniesTable from "../Tables/CompaniesTable";
//LOCAL HELPERS 
import { useAppSelector } from "../../app/hooks";
import { Company } from '../../interfaces'
import { allCompaniesCall, newCompanyCall } from "../../helpers/apiCalls";
//MUI COMPONENTS AND TYPES
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
//MUI ICONS
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const AllCompanies = () => {
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [companiesList, setCompaniesList] = useState<Company[] | []>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const companyNameRef = useRef('') as React.MutableRefObject<string> | any
  const token = useAppSelector(state => state.user.JWT)

  async function fetchAllCompanies() {
    const list = await allCompaniesCall(token)
    setCompaniesList(list)
  }

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
    }
    fetchAllCompanies()
  }, [successMessage, errorMessage])

  useEffect(() => {
    console.log(companiesList);
  }, [companiesList])

  //MUI CONFIG
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#398b93"),
    backgroundColor: "#f9a235",
    padding: '14px',
    "&:hover": {
      backgroundColor: "#19467c",
    },
  }));

  function NewCompanyTextField() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { width: '400px', marginRight: '20px', height: '50px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label='ime kompanije' variant="outlined" inputRef={companyNameRef} disabled={!!successMessage || !!errorMessage} />
      </Box >
    );
  }

  //handle company submit
  async function companySubmit() {
    let companyName: string = companyNameRef.current.value
    if (!companyName) {
      setErrorMessage('Obavezno uneti ime kompanije')
    }
    else {
      try {
        const postCompany = await newCompanyCall(token, companyName)
        if (postCompany) {
          setSuccessMessage('Uspešno kreirana kompanija')
        } else {
          console.log(postCompany);
          setErrorMessage('Došlo je do problema')
        }
      } catch (err: any) {
        console.error(err.message)
      }
      companyName = ''
    }
  }

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (token) setShowUserProfile(true);
        }}
      />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      <div className="content_container">
        <span className="heading_icon_wrapper">
          <h3 className="headings">Dodaj novu kompaniju</h3>
          <DomainAddIcon style={{ color: '#19467c' }} />
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "95%",
            alignItems: "center",
          }}
        >
          <span style={{ position: 'absolute', width: '300px', left: '40%', fontWeight: '600' }}>
            {successMessage &&
              <span style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                <p>{successMessage}</p>
              </span>}
            {errorMessage &&
              <span style={{ display: "flex", alignItems: 'center', color: 'red' }}>
                <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
                <p>{errorMessage}</p>
              </span>}
          </span>
          <NewCompanyTextField />
          <ColorButton onClick={companySubmit} variant='contained' disabled={!!successMessage || !!errorMessage} style={{ innerHeight: '50px' }}>
            Dodaj kompaniju
          </ColorButton>
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Kompanije</h3>
          <BusinessIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <CompaniesTable data={companiesList} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
        </div>
      </div>
    </div >
  );
};

export default AllCompanies;

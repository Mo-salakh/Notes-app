import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";


export interface UserInterface {
    name: string;
    email: string;
    password: string;
}

interface inputsValidation {
    nameValid: boolean
    emailValid: boolean
    passwordValid: boolean
}

interface appProps {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userEmail: string | null;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    isSigned: 'true' | 'false' | null;
    setSigned: React.Dispatch<React.SetStateAction<'true' | 'false'>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, type: string, onSuccess: () => void) => void;
    isValid: inputsValidation;
}

export type contextProp = {
    children: React.ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<appProps | null>(null);

export function AuthContextProvider({ children }: contextProp) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [notes, setNotes] = useState<['']>(['']);
    const [userEmail, setUserEmail] = useState<string | null>(() => {
        const localedValue = localStorage.getItem('userEmail')
        return localedValue ? JSON.parse(localedValue) : null
    });

    const [isValid, setValid] = useState<inputsValidation>({
        nameValid: true,
        emailValid: true,
        passwordValid: true
    })
    const [isSigned, setSigned] = useState<'true' | 'false'>(() => {
        const localState = localStorage.getItem('isSigned')
        return localState ? JSON.parse(localState) : 'false'
    });

    useEffect(() => {
        if(isSigned) {
            localStorage.setItem('userEmail', JSON.stringify(userEmail))
            localStorage.setItem('isSigned', JSON.stringify(isSigned) )
        }
    }, [userEmail, isSigned]);
 

    function handleSubmit(e: React.FormEvent<HTMLFormElement>, type: string, onSuccess: () => void) {
        e.preventDefault();
        const { email, password, nickname } = e.currentTarget;
        const emailValue = email.value;
        const passwordValue = password.value;
        const nameValue = nickname?.value;
        const auth = getAuth();

        if (type === 'login') {
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then(({user}) => {
                setUserEmail(user.email)
                setSigned('true');
                onSuccess()
            })
            .catch((error) => {
                console.log(error)
            });
        } else if (type === 'registration') {
            if(!isCorrect(emailValue, 'email') || !isCorrect(nameValue, 'name') || !isCorrect(passwordValue, 'password')) {
                return console.error('Ошибка! Неправильно указали данные.')
            }
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then(({user}) => {
              setUserEmail(user.email)
              onSuccess()
              setSigned('true');
            })
            .catch((error) => {
              console.log(error)
            });
        }
    }

    function isCorrect(data: string, type: 'email' | 'name' | 'password'): boolean {
        if(type === 'name') {
            if (data.length <= 2) {
                setValid((prevState) => ({ ...prevState, nameValid: false }))
                return false
            } else {
                setValid((prevState) => ({ ...prevState, nameValid: true }))
                return true
            }
        }
        if(type === 'email') {
            const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(data)) {
                setValid((prevState) => ({ ...prevState, emailValid: false }))
                return false
            } else {
                setValid((prevState) => ({ ...prevState, emailValid: true }))
                return true
            }
        }
        if(type === 'password') {
            if (data.length >= 4) {
                setValid((prevState) => ({ ...prevState, passwordValid: true }))
                return true
            } else {
                setValid((prevState) => ({ ...prevState, passwordValid: false }))
                return false
            }
        }
        return true
    }

    const value = {
        menuOpen,
        setMenuOpen,
        notes,
        setNotes,
        userEmail,
        setUserEmail,
        isSigned,
        setSigned,
        handleSubmit,
        isValid
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuthContext должен использоваться внутри AuthContextProvider'
        );
    }
    return context;
};

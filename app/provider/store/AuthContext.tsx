import { createContext, useContext, useEffect, useState } from 'react';

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
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
    regUser: (newUser: UserInterface) => void;
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
    const [user, setUser] = useState<UserInterface | null>(() => {
        const localedValue = localStorage.getItem('user')
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
        if(user && isSigned) {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('isSigned', JSON.stringify(isSigned) )
        }
    }, [user, isSigned]);
 
    function regUser(newUser: UserInterface): void {
        if (newUser) {
            setUser(newUser);
            setSigned('true');
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>, type: string, onSuccess: () => void) {
        e.preventDefault();
        const { email, password, nickname } = e.currentTarget;
        const emailValue = email.value;
        const passwordValue = password.value;
        const nameValue = nickname?.value;
        
        if (type === 'login') {
            if (user?.email === emailValue && user?.password === passwordValue) {
                setSigned('true');
                console.log(user);
                onSuccess()
            } else {
                alert('Ошибка! Неправильно ввели почту или пароль');
            }
        } else if (type === 'registration') {
            if(!isCorrect(emailValue, 'email') || !isCorrect(nameValue, 'name') || !isCorrect(passwordValue, 'password')) {
                return console.error('Ошибка! Неправильно указали данные.')
            }

            onSuccess()
            regUser({
                name: nameValue,
                email: emailValue,
                password: passwordValue
            });
        }
    }

    function isCorrect(data: string, type: 'email' | 'name' | 'password'): boolean {
        if(type === 'name') {
            if (data.length <= 2 || data === user?.name) {
                setValid((prevState) => ({ ...prevState, nameValid: false }))
                return false
            } else {
                setValid((prevState) => ({ ...prevState, nameValid: true }))
                return true
            }
        }
        if(type === 'email') {
            const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(data) || data === user?.email) {
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
        user,
        setUser,
        regUser,
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

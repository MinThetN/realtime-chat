import { toast } from "react-toastify"
import "./login.css"
import { useState } from "react"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import upload from "../../lib/upload"
import { useUserStore } from "../../lib/userStore";
import { MessageCircle, Upload } from 'lucide-react';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const { fetchUserInfo } = useUserStore()

    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, "users", res.user.uid),{
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });
            // Manually fetch user info to update the store immediately
            await fetchUserInfo(res.user.uid)

            await setDoc(doc(db, "userchats", res.user.uid),{
                chats: [],
            });

            toast.success("Account created successfully")

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Logged in successfully")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login">
            {/* Left Side - Logo and Branding */}
            <div className="login-left">
                <div className="logo-container">
                    <div className="logo">
                        <MessageCircle size={80} />
                    </div>
                    <h1>ChatApp</h1>
                    <p>Connect with friends and family instantly</p>
                </div>
                <div className="features">
                    <div className="feature">
                        <span>💬</span>
                        <p>Real-time messaging</p>
                    </div>
                    <div className="feature">
                        <span>🔒</span>
                        <p>Secure & Private</p>
                    </div>
                    <div className="feature">
                        <span>📱</span>
                        <p>Cross-platform</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Forms */}
            <div className="login-right">
                <div className="form-container">
                    <div className="form-header">
                        <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                        <p>{isSignUp ? "Join our community today" : "Sign in to your account"}</p>
                    </div>

                    {!isSignUp ? (
                        // Login Form
                        <form onSubmit={handleLogin} className="auth-form">
                            <div className="input-group">
                                <input type="email" placeholder="Email" name="email" required />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" name="password" required />
                            </div>
                            <button type="submit" disabled={loading} className="auth-button">
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </form>
                    ) : (
                        // Register Form
                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="avatar-upload">
                                <label htmlFor="file" className="avatar-label">
                                    <img src={avatar.url || "./images/avatar.jpg"} alt="Avatar" />
                                    <div className="upload-overlay">
                                        <Upload size={20} />
                                    </div>
                                </label>
                                <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar} />
                                <span className="avatar-text">Upload Avatar</span>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Username" name="username" required />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" name="email" required />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" name="password" required />
                            </div>
                            <button type="submit" disabled={loading} className="auth-button">
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>
                    )}

                    <div className="form-footer">
                        <p>
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            <button 
                                type="button" 
                                className="toggle-button"
                                onClick={() => setIsSignUp(!isSignUp)}
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

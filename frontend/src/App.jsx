import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AuthorPosts from "./pages/AuthorPosts.jsx";
import Authors from "./pages/Authors.jsx";
import CategoryPosts from "./pages/CategoryPosts.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeletePost from "./pages/DeletePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";

const App = () => {
  const { authUser } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/profile/:id"
          element={authUser ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route path="/authors" element={<Authors />} />
        <Route
          path="/create"
          element={authUser ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts/categories/:category"
          element={authUser ? <CategoryPosts /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts/users/:id"
          element={authUser ? <AuthorPosts /> : <Navigate to="/login" />}
        />
        <Route
          path="/myposts/:id"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts/:id/edit"
          element={authUser ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts/:id/delete"
          element={authUser ? <DeletePost /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;

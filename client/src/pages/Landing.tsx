import { NavLink } from 'react-router-dom';
import { useStore } from '../store';

function Landing() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }

  const { state } = store;

  return (
    <>
      <section className="d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Wine Shop Tracker</h1>
        <p>Your one stop <i>shop</i> for all of your wine shop tracking needs</p>
        <NavLink 
          to={state.user ? '/shops' : '/register'} 
          className="btn btn-primary btn-lg px-5">
            {state.user ? 'View Your Shops!' : 'Start Now!'}
          </NavLink>
      </section>
    </>
  )
}

export default Landing;
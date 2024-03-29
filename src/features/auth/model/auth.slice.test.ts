import { authActions, authReducer } from "./auth.slice";

let startState: { isLoggedIn: boolean };

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("user should be logged in", () => {
  const endState = authReducer(startState, authActions.setIsLoggedIn({ isLoggedIn: true }));
  expect(endState.isLoggedIn).toBe(true);
});

test("correct status should be set", () => {
  const endState = authReducer(startState, authActions.setIsLoggedIn({ isLoggedIn: false }));
  expect(endState.isLoggedIn).toBe(false);
});

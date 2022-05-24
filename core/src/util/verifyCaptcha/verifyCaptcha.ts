import uid from "uid-safe";

// Solution must be correct within the given tolerance
const verifySolution = (captcha: number, solution: number, tolerance: number) =>
  Math.abs(captcha - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
//TODO: correct any types
const verifyHorizontalMotion = (positions: any) =>
  !positions.reduce(
    (jumpToInput: any, pos: any) =>
      jumpToInput && (pos === 0 || pos === positions[positions.length - 1]),
    true
  );

// Vertical motion must be present while dragging the slider
//TODO: correct any types
const verifyVerticalMotion = (positions: any) =>
  positions.reduce((total: any, pos: any) => total + pos) !== 0;

const verifyTrailLength = (trail: any) => trail.x.length === trail.y.length;

const verifyResponse = (
  captcha: any,
  solution: any,
  trail: any,
  tolerance: any
) =>
  verifySolution(captcha, solution, tolerance) &&
  verifyTrailLength(trail) &&
  verifyHorizontalMotion((trail.x, solution)) &&
  verifyVerticalMotion(trail.y);

//TODO: correct any types
const verifyCaptcha = (
  captcha: any,
  { response, trail }: any,
  { tolerance = 7, verify = verifyResponse } = {}
) =>
  new Promise((resolve) => {
    if (verify(captcha, response, trail, tolerance)) {
      uid(32).then((token) => {
        resolve({
          result: "success",
          token,
        });
      });
    } else {
      resolve({ result: "failure" });
    }
  });

export default verifyCaptcha;

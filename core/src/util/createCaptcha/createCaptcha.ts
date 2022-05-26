import sharp from "sharp";
import {
  createRandomInteger,
  puzzlePieceSvg,
  backgroundSvg,
} from "./generateCaptcha";

const initialSizes = {
  WIDTH: 350,
  HEIGHT: 200,
  PUZZLE_SIZE: 60,
  PADDING: 20,
};

interface CaptchaOptions {
  imageOptions?: {
    width: number;
    height: number;
    puzzleSize?: number;
    padding?: number;
  };
  image?: Buffer;
  distort?: boolean;
  rotate?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  opacity?: string;
}

const createCaptcha = async (options?: CaptchaOptions) => {
  const imageOptions = {
    width: options?.imageOptions?.width || initialSizes.WIDTH,
    height: options?.imageOptions?.height || initialSizes.HEIGHT,
    puzzleSize: options?.imageOptions?.puzzleSize || initialSizes.PUZZLE_SIZE,
    padding: options?.imageOptions?.padding || initialSizes.PADDING,
  };
  const image =
    options?.image ||
    Buffer.from(backgroundSvg(imageOptions.width, imageOptions.height));
  const distort = options?.distort || false;
  const rotate = options?.rotate || false;
  const fill = options?.fill || "#000";
  const stroke = options?.stroke || "#fff";
  const strokeWidth = options?.strokeWidth || ".4";
  const opacity = options?.opacity || "0.5";

  const seed = createRandomInteger();
  const overlay = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      fill,
      stroke,
      strokeWidth,
      opacity,
      seed,
    })
  );
  const mask = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      strokeWidth,
      fill: "#fff",
      stroke: "#fff",
      opacity: "1",
    })
  );
  const outline = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      stroke,
      strokeWidth,
      fill: "none",
      opacity: "1",
    })
  );
  const location = {
    // Solution for slider
    left: createRandomInteger(
      imageOptions.puzzleSize + imageOptions.padding,
      imageOptions.width - (imageOptions.puzzleSize + imageOptions.padding)
    ),
    // Vertical offset
    top: createRandomInteger(
      imageOptions.padding,
      imageOptions.height - (imageOptions.puzzleSize + imageOptions.padding)
    ),
  };

  const ins = sharp(image).resize({
    width: imageOptions.width,
    height: imageOptions.height,
  });
  const background = await ins
    .composite([
      {
        input: overlay,
        blend: "over",
        top: location.top,
        left: location.left,
      },
    ])
    .png()
    .toBuffer();
  const composed = await ins
    .composite([
      {
        input: mask,
        blend: "dest-in",
        top: location.top,
        left: location.left,
      },
      {
        input: outline,
        blend: "over",
        top: location.top,
        left: location.left,
      },
    ])
    .toBuffer();
  const slider = await sharp(composed)
    .extract({
      left: location.left,
      top: 0,
      width: imageOptions.puzzleSize,
      height: imageOptions.height,
    })
    .png()
    .toBuffer();
  return {
    data: {
      background,
      slider,
    },
    solution: location.left,
  };
};

export default createCaptcha;

import "../css/Bio.css";
import { importIndexAll } from "../components/importfunc/importfunc";

declare const require: NodeJS.Require;


export function Bio() {
  return (
    <div className="bio_c">
      <h1 className="bio title lexend">Sobre mim</h1>
      <p className="bio lexend">
        Olá, meu nome é Aclerson R. da Silva e fiz este site para expor melhor
        meus projetos tanto na área de ciências da computação quanto na área de
        Game Programming. Este site está em desenvolvimento constante e está me
        ajudando a entender mais como utilizar o framework React.
      </p>
      <hr className="divider"></hr>
      <h1 className="resume title lexend">Resumo das Stacks</h1>
      <Resume
        text={
          "Godot Engine foi utilizada em prototipagem de projetos simples em 2D e 3D quando eu comecei na área de desenvolvimento de games e continuo utilizando devido a sua interface simples e desenvolvimento rápido de mecânicas básicas."
        }
        link={"https://godotengine.org/"}
        alt={"Godot Logo"}
        dif={"godot"}
      />
      <Resume
        text={
          "Unity Engine foi essencial para o desenvolvimento dos fundamentos da programação de jogos e Game Design que utilizei todos os dias no meu curso técnico de programação de jogos."
        }
        link={"https://unity.com/pt"}
        alt={"Unity Logo"}
        dif={"unity"}
      />
    </div>
  );
}

interface ResumeFormat
{
  link : string, text : string, alt : string, dif : string
}

function Resume({ link , text, alt, dif } : ResumeFormat) {
  return (
    <div className="resume_c">
      <a
        className="origin_link"
        href={link}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          alt={alt}
          className={"resume_img " + dif}
          src={logos[dif + ".png"]}
          loading="lazy"
        ></img>
      </a>
      <p className="resume_txt lexend">{text}</p>
    </div>
  );
}

const logos = importIndexAll<string>(
  require.context("../images/logos", false, /\.(png|jpe?g|svg)$/),
);

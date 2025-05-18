export function Header() {
  return (
    <header>
      <h1 class="title lexend">Portfólio</h1>
      <Bio />
    </header>
  );
}

function Bio() {
  return (
    <div class="bio_c">
      <h1 class="bio title lexend">Bio</h1>
      <p class="bio lexend">
        Olá,meu nome é Aclerson R. da Silva e fiz este site para expor melhor
        meus projetos tanto na área de ciências da computação quanto na área de
        Game Programming. Este site está em desenvolvimento constante e está me
        ajudando a entender mais como utilizar o framework React.
      </p>
    </div>
  );
}

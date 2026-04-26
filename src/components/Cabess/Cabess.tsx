import { NavLink } from "react-router-dom";

import "./Cabess.css"

export default function Cabess (){
    return (
        <>
            <header>
                <nav className="faixa">
                    <NavLink to="/aeronaves" className={ ( {isActive} ) => isActive ? "item-faixa ativo" : "item-faixa"}>
                        AERONAVES
                    </NavLink>

                    <NavLink to="/etapas" className={ ( {isActive} ) => isActive ? "item-faixa ativo" : "item-faixa" }>
                        ETAPAS
                    </NavLink>

                    <NavLink to="/pecas" className={ ( {isActive} ) => isActive ? "item-faixa ativo" : "item-faixa" }>
                        PEÇAS
                    </NavLink>

                    <NavLink to="/funcionarios" className={ ( {isActive} ) => isActive ? "item-faixa ativo" : "item-faixa" }>
                        FUNCIONÁRIOS
                    </NavLink>

                    <NavLink to="/testes" className={ ( {isActive} ) => isActive ? "item-faixa ativo" : "item-faixa" }>
                        TESTES
                    </NavLink>
                </nav>
            </header>
        </>
    )
}

// OBSERVAÇÕES
// Página com rotas da aplicação (to="/nomeRota") que podem ser acessadas atravez do NavLink
// { } pra usar java script no HTML do react
// { isActive } pra pegar o props do objeto que eu estou manipulando, usando a técnica de destructuring
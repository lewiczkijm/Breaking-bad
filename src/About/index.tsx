export const About = ()=>{
    return <div className={"is-padding-20"}>
        <h1 className={"title"}>About</h1>
        <div className={"block"}>
            <p>
                It is test exercise application to get data from api. Here You can see information about series Breaking Bad.
                As data source for it I used api <a href={"https://breakingbadapi.com/"}>breakingbadapi.com.</a>
            </p>
            <p>
                In order to do this application I used the following components:
                javascript ui library <a href={"https://reactjs.org/"}>react</a>,
                ui css framework <a href={"https://bulma.io/"}>bulma</a>.
                Additionally, we used typescript, jest testing, mdi js icons.
            </p>
        </div>
        <div className={"block"}>
            <p>
                Source code of this application is here <a href={"https://github.com/lewiczkijm/Breaking-bad"}>github.com/lewiczkijm/Breaking-bad</a>.
                For any questions you can contact me <a href={"mailto:mikhaillevitskiidev@gmail.com"}>mikhaillevitskiidev@gmail.com</a>
            </p>
        </div>
    </div>
}
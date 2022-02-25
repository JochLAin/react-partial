# @jochlain/react-partial

## Installation

`npm install --save react @jochlain/react-partial`

## Usage

```javascript
// ./components/layout/base.js
import { usePartials } from "@jochlain/react-partial";

export default function BaseLayout(props) {
    const [children, partials] = usePartials(props.children, ['nav', 'breadcrumb']);

    return <article className="layout">
        <nav className="navbar">
            <h1 className="navbar-brand">
                Partial usage example
            </h1>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" className="nav-link">
                        Home
                    </a>
                </li>
                {partials.nav}
            </ul>
        </nav>
        <main className="content">
            {partials.breadcrumb && (
                <ul className="breadcrumb">
                    {partials.breadcrumb}
                </ul>
            )}
            {children}
        </main>
    </article>;
}
```

```javascript
// ./components/layout/index.js
import Partial from "@jochlain/react-partial";
import BaseLayout from "components/layout/base";

export default function Layout(props) {
    return <BaseLayout>
        <Partial type="nav">
            <li className="nav-item">
                <a href="/blog" className="nav-link">
                    Blog
                </a>
            </li>
            <li className="nav-item">
                <a href="/game" className="nav-link">
                    Game
                </a>
            </li>
        </Partial>
        {props.children}
    </BaseLayout>;
}
```

```javascript
// ./components/index.js
import Partial from "@jochlain/react-partial";
import Layout from "components/layout";

export default function Index() {
    return <Layout>
        <Partial type="nav">
            <li className="nav-item">
                <a href="#" className="nav-link">
                    My menu only in home
                </a>
            </li>
        </Partial>
        <blockquote>
            <p>Hello World</p>
            <cite>— Brian Kernighan & Dennis Ritchie</cite>
        </blockquote>
    </Layout>;
}
```

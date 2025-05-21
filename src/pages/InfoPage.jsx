import "../styles/InfoPage.css"

const InfoPage = () => {
  return (
    <div className="info-page">
      <h1>About Code Wallet</h1>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Save and organize code fragments</li>
          <li>Tag your code for easy categorization</li>
          <li>Simple code display for better readability</li>
          <li>Dark mode for comfortable coding at night</li>
          <li>Copy code to clipboard with one click</li>
        </ul>
      </section>

      <section>
        <h2>Keyboard Shortcuts</h2>
        <div className="shortcuts">
          <div className="shortcut">
            <kbd>Esc</kbd>
            <span>Close any open modal</span>
          </div>
          <div className="shortcut">
            <kbd>Ctrl</kbd> + <kbd>D</kbd>
            <span>Toggle dark mode</span>
          </div>
          <div className="shortcut">
            <kbd>Ctrl</kbd> + <kbd>N</kbd>
            <span>Create new fragment</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Developers</h2>
        <p>
          Code Wallet was developed by Malik MAHAMMED as part of the EverydayDev project, a startup focused on creating tools for developers.
        </p>
        <p>Team: Albertine (Director), Joanne (Commercial), and Malik ( Developer). </p>
      </section>

      <section>
        <h2>Legal Information</h2>
        <p>
          Code Wallet collects anonymized usage data to improve the application.
        </p>
        <p>
          By using Code Wallet, you agree to our data collection practices. No personal information is collected or stored.
        </p>
        <p>© 2025 EverydayDev. All rights reserved.</p>
      </section>
    </div>
  )
}

export default InfoPage

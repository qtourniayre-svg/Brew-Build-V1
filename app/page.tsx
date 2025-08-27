export default function Page(){
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Bienvenue sur Brew Build</h2>
        <p>Version Gitpod (SQLite) prête à démarrer.</p>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Raccourcis</h3>
        <ul className="list-disc ml-5">
          <li>Connexion via <b>/login</b> — <i>admin@brewbuild.local / admin123</i></li>
          <li>Ajoutez des <b>Matériels</b> puis testez le <b>Gantt</b></li>
        </ul>
      </div>
    </div>
  )
}

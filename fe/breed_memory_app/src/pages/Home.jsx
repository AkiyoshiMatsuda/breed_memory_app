function Home() {
  const reptiles = [
    {
        id: 1,
        name: "レオ",
        species: "クレステッドゲッコー",
    },
    {
        id: 2,
        name: "モカ",
        species: "ガーゴイルゲッコー",
    }
  ];
  return (
    <div className="container">
      <h1>ホーム</h1>
      <p>爬虫類飼育記録アプリへようこそ</p>

      <div className="card">
        <h2>生体一覧</h2>
        {reptiles.map((reptile) => (
            <div key={reptile.id}>
                {reptile.name} - {reptile.species}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
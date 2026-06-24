import { useState, useMemo } from "react";

function FilteringLargeData() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const users = [
    "John",
    "David",
    "Alex",
    "Michael",
    "Sarah",
    "Emma",
    "James"
  ];

  const filteredUsers = useMemo(() => {
    console.log("Filtering users");

    return users.filter(user =>
      user.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <h2>User Search</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setCount(count + 1)}>
        Count {count}
      </button>

      <ul>
        {filteredUsers.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilteringLargeData;
const pieData = {
  labels: ["Food", "Travel", "Shopping", "Bills"],

  datasets: [
    {
      label: "Expenses",

      data: [
        (expenses || []).filter(e => e.category === "Food").reduce((a, b) => a + (b.amount || 0), 0),

        (expenses || []).filter(e => e.category === "Travel").reduce((a, b) => a + (b.amount || 0), 0),

        (expenses || []).filter(e => e.category === "Shopping").reduce((a, b) => a + (b.amount || 0), 0),

        (expenses || []).filter(e => e.category === "Bills").reduce((a, b) => a + (b.amount || 0), 0)
      ],

      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"]
    }
  ]
};
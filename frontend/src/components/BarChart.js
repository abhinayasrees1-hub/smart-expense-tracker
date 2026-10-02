const barData = {
  labels: (expenses || []).map((e, i) => `Expense ${i + 1}`),

  datasets: [
    {
      label: "Expenses (₹)",

      data: (expenses || []).map(e => e.amount || 0),

      backgroundColor: "#6a5acd"
    }
  ]
};};
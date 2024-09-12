export function addCommas(n: number): string {
  return n.toLocaleString("el-GR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function num2gr(n: number): string {
  const num = n.toLocaleString("el-GR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `€ ${num}`
}

// Dummy pricing logic for AWS, Azure, Google Cloud

export interface CostBreakdown {
  provider: "AWS" | "Azure" | "GCP";
  storageCost: number;
  computeCost: number;
  transferCost: number;
  totalCost: number;
}

export function calculateCosts(
  storageGB: number,
  computeHours: number,
  transferGB: number
): CostBreakdown[] {
  // AWS Assumptions
  // Storage: $0.023/GB, Compute: $0.04/hr, Transfer: $0.09/GB
  const awsStorage = storageGB * 0.023;
  const awsCompute = computeHours * 0.04;
  const awsTransfer = transferGB * 0.09;
  
  // Azure Assumptions
  // Storage: $0.018/GB, Compute: $0.045/hr, Transfer: $0.087/GB
  const azureStorage = storageGB * 0.018;
  const azureCompute = computeHours * 0.045;
  const azureTransfer = transferGB * 0.087;
  
  // GCP Assumptions
  // Storage: $0.020/GB, Compute: $0.035/hr, Transfer: $0.08/GB
  const gcpStorage = storageGB * 0.020;
  const gcpCompute = computeHours * 0.035;
  const gcpTransfer = transferGB * 0.08;

  return [
    {
      provider: "AWS",
      storageCost: Number(awsStorage.toFixed(2)),
      computeCost: Number(awsCompute.toFixed(2)),
      transferCost: Number(awsTransfer.toFixed(2)),
      totalCost: Number((awsStorage + awsCompute + awsTransfer).toFixed(2))
    },
    {
      provider: "Azure",
      storageCost: Number(azureStorage.toFixed(2)),
      computeCost: Number(azureCompute.toFixed(2)),
      transferCost: Number(azureTransfer.toFixed(2)),
      totalCost: Number((azureStorage + azureCompute + azureTransfer).toFixed(2))
    },
    {
      provider: "GCP",
      storageCost: Number(gcpStorage.toFixed(2)),
      computeCost: Number(gcpCompute.toFixed(2)),
      transferCost: Number(gcpTransfer.toFixed(2)),
      totalCost: Number((gcpStorage + gcpCompute + gcpTransfer).toFixed(2))
    }
  ];
}

export function calculateSustainability(tokens: number) {
  // Rough estimate:
  // 1,000,000 tokens ~ 0.003 kWh ~ 1.5 grams of CO2 depending on hardware/grid
  const kwhRate = 0.003 / 1000000;
  const co2Rate = 1.5 / 1000000;
  
  const energyKwh = tokens * kwhRate;
  const carbonGrams = tokens * co2Rate;

  return {
    energyKwh: Number(energyKwh.toFixed(4)),
    carbonGrams: Number(carbonGrams.toFixed(4)),
    equivalents: {
      kmDriven: Number((carbonGrams / 120).toFixed(4)), // Avg car is 120g/km
      smartphonesCharged: Number((energyKwh / 0.015).toFixed(1)) // Avg 15Wh per charge
    }
  };
}

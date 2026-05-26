#!/usr/bin/env node

/**
 * Guest Code Generator Script
 * Run with: node scripts/generate-codes.js
 * 
 * Generates unique 6-digit guest codes for distribution
 */

const fs = require('fs')
const path = require('path')

const generateCode = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

const generateCodes = (count = 20) => {
  const codes = new Set()

  while (codes.size < count) {
    codes.add(generateCode())
  }

  return Array.from(codes)
}

const formatCodesForCSV = (codes) => {
  return codes
    .map(
      (code, index) => `${index + 1},${code},https://yourdomain.com/invite/${code}`
    )
    .join('\n')
}

const main = () => {
  const count = parseInt(process.argv[2]) || 20

  console.log(`Generating ${count} unique guest codes...\n`)

  const codes = generateCodes(count)

  console.log('Guest Codes Generated:')
  console.log('========================')
  codes.forEach((code, i) => {
    console.log(`${i + 1}. ${code}`)
  })

  // Save to file
  const csv = 'ID,Code,Guest URL\n' + formatCodesForCSV(codes)
  const filename = `guest-codes-${new Date().toISOString().split('T')[0]}.csv`

  fs.writeFileSync(filename, csv)
  console.log(`\n✓ Codes saved to ${filename}`)
}

main()

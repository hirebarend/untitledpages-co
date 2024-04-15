param name string = 'untitledpages'

param location string = resourceGroup().location

resource swa_resource1 'Microsoft.Web/staticSites@2022-09-01' = {
  name: 'stapp-${name}-prod-001'
  location: location
  tags: null
  properties: {}
  sku: {
    name: 'Free'
    size: 'Free'
  }
}

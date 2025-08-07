'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  Warning,
  CheckCircle,
  Error,
  Info,
  Cloud,
  Computer,
  Storage,
  Security,
} from '@mui/icons-material';

// Vulnerabilities Page
export const VulnerabilitiesPage: React.FC = () => {
  const theme = useTheme();

  const vulnerabilities = [
    { id: 'CVE-2024-0001', severity: 'Critical', asset: 'web-server-01', status: 'Open' },
    { id: 'CVE-2024-0002', severity: 'High', asset: 'database-01', status: 'In Progress' },
    { id: 'CVE-2024-0003', severity: 'Medium', asset: 'api-gateway', status: 'Resolved' },
    { id: 'CVE-2024-0004', severity: 'Low', asset: 'worker-node-03', status: 'Open' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return theme.palette.error.main;
      case 'High': return theme.palette.warning.main;
      case 'Medium': return theme.palette.info.main;
      case 'Low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Vulnerability Management</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track and manage security vulnerabilities across your infrastructure
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error">Critical</Typography>
              <Typography variant="h3">12</Typography>
              <Typography variant="body2" color="text.secondary">Require immediate attention</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">High</Typography>
              <Typography variant="h3">34</Typography>
              <Typography variant="body2" color="text.secondary">High priority fixes</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">Medium</Typography>
              <Typography variant="h3">78</Typography>
              <Typography variant="body2" color="text.secondary">Medium priority</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">Low</Typography>
              <Typography variant="h3">156</Typography>
              <Typography variant="body2" color="text.secondary">Low priority items</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CVE ID</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Affected Asset</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vulnerabilities.map((vuln) => (
              <TableRow key={vuln.id}>
                <TableCell>{vuln.id}</TableCell>
                <TableCell>
                  <Chip 
                    label={vuln.severity} 
                    size="small" 
                    sx={{ backgroundColor: getSeverityColor(vuln.severity), color: 'white' }}
                  />
                </TableCell>
                <TableCell>{vuln.asset}</TableCell>
                <TableCell>{vuln.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Compliance Page
export const CompliancePage: React.FC = () => {
  const frameworks = [
    { name: 'SOC 2 Type II', score: 87, status: 'Compliant' },
    { name: 'PCI DSS', score: 92, status: 'Compliant' },
    { name: 'ISO 27001', score: 73, status: 'Non-Compliant' },
    { name: 'HIPAA', score: 95, status: 'Compliant' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Compliance Monitoring</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Monitor compliance across security frameworks and standards
      </Typography>

      <Grid container spacing={3}>
        {frameworks.map((framework) => (
          <Grid item xs={12} md={6} key={framework.name}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{framework.name}</Typography>
                  <Chip 
                    label={framework.status}
                    color={framework.status === 'Compliant' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Compliance Score: {framework.score}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={framework.score} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Assets Page
export const AssetsPage: React.FC = () => {
  const assets = [
    { name: 'AWS Production', type: 'Cloud', status: 'Healthy', count: 145 },
    { name: 'Azure Staging', type: 'Cloud', status: 'Warning', count: 67 },
    { name: 'On-Premise Servers', type: 'Server', status: 'Healthy', count: 23 },
    { name: 'Container Registry', type: 'Container', status: 'Healthy', count: 89 },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Cloud': return <Cloud />;
      case 'Server': return <Computer />;
      case 'Container': return <Storage />;
      default: return <Security />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Asset Inventory</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage and monitor your infrastructure assets
      </Typography>

      <Grid container spacing={3}>
        {assets.map((asset) => (
          <Grid item xs={12} sm={6} md={3} key={asset.name}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {getIcon(asset.type)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{asset.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{asset.type}</Typography>
                  </Box>
                </Box>
                <Typography variant="h4">{asset.count}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Assets</Typography>
                  <Chip 
                    label={asset.status}
                    color={asset.status === 'Healthy' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Generic page component for other sections
export const GenericPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <Box>
    <Typography variant="h4" gutterBottom>{title}</Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      {description}
    </Typography>
    
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Coming Soon</Typography>
        <Typography variant="body2" color="text.secondary">
          This section is under development. More features and functionality will be added soon.
        </Typography>
        
        <List sx={{ mt: 2 }}>
          <ListItem>
            <ListItemIcon><Info color="primary" /></ListItemIcon>
            <ListItemText primary="Advanced analytics and reporting" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText primary="Real-time monitoring capabilities" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Warning color="warning" /></ListItemIcon>
            <ListItemText primary="Automated remediation workflows" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Error color="error" /></ListItemIcon>
            <ListItemText primary="Integration with external tools" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </Box>
);

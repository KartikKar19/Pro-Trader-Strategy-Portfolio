import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Switch } from './components/ui/switch'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Checkbox } from './components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts'
import { 
  TrendingUp, TrendingDown, Copy, Settings, Play, DollarSign, BarChart3, Target, Clock, Zap,
  Search, User, Menu, Star, TrendingUpIcon, Plus, Minus, Maximize2, RotateCcw,
  Activity, PieChart, Briefcase, Eye, MessageSquare, Bell
} from 'lucide-react'

// Mock data for the equity curve
const equityData = [
  { month: 'Jan', value: 50000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 55000 },
  { month: 'May', value: 58000 },
  { month: 'Jun', value: 62000 },
  { month: 'Jul', value: 59000 },
  { month: 'Aug', value: 68000 },
  { month: 'Sep', value: 72000 },
  { month: 'Oct', value: 75000 },
  { month: 'Nov', value: 82000 },
  { month: 'Dec', value: 125000 }
]

// Mock watchlist data
const watchlistData = [
  { symbol: 'SBIN', price: 856.95, change: 0.000, exchange: 'NSE' },
  { symbol: 'SBIN', price: 857.00, change: 0.000, exchange: 'BSE' },
  { symbol: 'IOC', price: 145.04, change: 0.000, exchange: 'NSE' },
  { symbol: 'IOC', price: 145.05, change: 0.000, exchange: 'BSE' },
  { symbol: 'ETERNAL', price: 321.00, change: 0.000, exchange: 'NSE' },
  { symbol: 'ETERNAL', price: 321.05, change: 0.000, exchange: 'BSE' }
]

// Mock chart data for SBIN
const chartData = [
  { time: '13:30', open: 850, high: 855, low: 848, close: 852 },
  { time: '13:45', open: 852, high: 858, low: 850, close: 856 },
  { time: '14:00', open: 856, high: 862, low: 854, close: 860 },
  { time: '14:15', open: 860, high: 865, low: 858, close: 863 },
  { time: '14:30', open: 863, high: 868, low: 861, close: 865 },
  { time: '14:45', open: 865, high: 870, low: 863, close: 867 },
  { time: '15:00', open: 867, high: 872, low: 865, close: 869 }
]

// Pro traders data
const proTraders = [
  {
    id: 1,
    name: 'AlphaQuant',
    strategy: 'Momentum Master',
    totalReturn: 150,
    maxDrawdown: 12,
    performanceFee: 10,
    traderCapital: 50000,
    followerCapital: 250000,
    status: 'Active',
    winRate: 68,
    profitFactor: 2.1
  },
  {
    id: 2,
    name: 'TechTrader Pro',
    strategy: 'Breakout Specialist',
    totalReturn: 89,
    maxDrawdown: 8,
    performanceFee: 15,
    traderCapital: 75000,
    followerCapital: 180000,
    status: 'Active',
    winRate: 72,
    profitFactor: 1.9
  },
  {
    id: 3,
    name: 'ValueInvestor',
    strategy: 'Long Term Value',
    totalReturn: 45,
    maxDrawdown: 5,
    performanceFee: 8,
    traderCapital: 100000,
    followerCapital: 320000,
    status: 'Active',
    winRate: 65,
    profitFactor: 1.7
  }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('trading')
  const [selectedStock, setSelectedStock] = useState('SBIN')
  const [selectedTrader, setSelectedTrader] = useState(proTraders[0])
  const [investmentAmount, setInvestmentAmount] = useState('5000')
  const [autoInvest, setAutoInvest] = useState(false)
  const [pacOpen, setPacOpen] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState('')
  const [entryRules, setEntryRules] = useState([])
  const [stopLoss, setStopLoss] = useState('2.0')
  const [takeProfit, setTakeProfit] = useState('3.0')
  const [backtestResults, setBacktestResults] = useState(null)
  const [riskCompliant, setRiskCompliant] = useState(false)
  const [copyModalOpen, setCopyModalOpen] = useState(false)
  const [atrStopLoss, setAtrStopLoss] = useState(true)
  const [timeBasedExit, setTimeBasedExit] = useState(false)
  const [timeBasedCandles, setTimeBasedCandles] = useState('5')

  const calculateFee = (amount) => {
    return Math.round(parseFloat(amount) * (selectedTrader.performanceFee / 100))
  }

  const calculateMargin = (amount) => {
    return Math.round(parseFloat(amount) * 0.2) // 20% margin requirement
  }

  const handleCapturePoint = () => {
    setSelectedPoint('SBIN 856.95 @ 14:35 - IV: 45% - Delta: +0.72')
  }

  const handleRunBacktest = () => {
    const rrRatio = parseFloat(takeProfit) / parseFloat(stopLoss)
    setRiskCompliant(rrRatio >= 2.0)
    setBacktestResults({
      winRate: 62,
      profitFactor: 1.8,
      maxDrawdown: 15,
      rrRatio: rrRatio.toFixed(1)
    })
  }

  const handleAddRule = () => {
    setEntryRules([...entryRules, { id: Date.now(), condition: 'Stock Price crosses above EMA(50)' }])
  }

  const handleCopyStrategy = () => {
    setCopyModalOpen(true)
  }

  const handleConfirmCopyTrade = () => {
    // Simulate copy trade execution
    alert(`Copy trade confirmed! 
    - Strategy: ${selectedTrader.strategy}
    - Investment: $${investmentAmount}
    - Fee: $${calculateFee(investmentAmount)}
    - Margin: $${calculateMargin(investmentAmount)}
    - Auto-invest: ${autoInvest ? 'Enabled' : 'Disabled'}`)
    setCopyModalOpen(false)
  }

  const handleDeployPaper = () => {
    alert('Strategy deployed to Paper Trading! You can monitor its performance in the Portfolio tab.')
  }

  const handleDeployLive = () => {
    if (riskCompliant) {
      alert('Strategy deployed to Live Trading! Remember to monitor risk carefully.')
    } else {
      alert('Risk-to-Reward ratio must be ≥2:1 before deploying to live trading.')
    }
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Nubra</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span>NIFTY</span>
                <span className="text-green-400">22,004.70</span>
                <span className="text-green-400 text-xs">(+0.00%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>BANKNIFTY</span>
                <span className="text-green-400">51,389.35</span>
                <span className="text-green-400 text-xs">(+0.00%)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search Stocks" className="pl-10 w-64" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">Watchlist</Button>
              <Button variant="ghost" size="sm">Options</Button>
              <Button variant="ghost" size="sm">Chart Analyzer</Button>
              <Button variant="ghost" size="sm">Portfolio</Button>
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Watchlist */}
        <div className="w-80 border-r border-border bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Default Watchlist 1</h3>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search and add to Watchlist" className="pl-10" />
            </div>
          </div>

          <div className="space-y-1">
            {watchlistData.map((stock, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedStock === stock.symbol ? 'bg-blue-500/20' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedStock(stock.symbol)}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{stock.symbol}</span>
                    <Badge variant="outline" className="text-xs">{stock.exchange}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{stock.exchange}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{stock.price}</div>
                  <div className="text-xs text-green-400">▲ ({stock.change.toFixed(3)}%)</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-card border-b">
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="pro-traders">Pro Traders</TabsTrigger>
              <TabsTrigger value="pattern-algo">Pattern-to-Algo</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Trading Tab */}
            <TabsContent value="trading" className="flex-1 flex flex-col m-0">
              <div className="flex-1 flex flex-col">
                {/* Stock Header */}
                <div className="bg-card border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-2xl font-bold">{selectedStock}</h2>
                          <Badge variant="outline">NSE</Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-lg">856.95</span>
                          <span className="text-green-400">▲ +00.00 (0.00%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button className="bg-green-500 hover:bg-green-600">Buy</Button>
                      <Button className="bg-red-500 hover:bg-red-600">Sell</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 mt-4">
                    <Button variant="ghost" className="text-blue-400">Overview</Button>
                    <Button variant="ghost">Fundamentals</Button>
                    <Button variant="ghost">Option Chain</Button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 p-4">
                  <div className="bg-card rounded-lg p-4 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">1m</Button>
                        <Button variant="ghost" size="sm" className="bg-blue-500/20 text-blue-400">5m</Button>
                        <Button variant="ghost" size="sm">15m</Button>
                        <Button variant="ghost" size="sm">1h</Button>
                        <Button variant="ghost" size="sm">1D</Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Activity className="w-4 h-4 mr-2" />
                          Indicators
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="5 5" stroke="#374151" />
                          <XAxis dataKey="time" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="close" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Pro Traders Tab */}
            <TabsContent value="pro-traders" className="flex-1 m-0 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Trader List */}
                <div className="lg:col-span-1">
                  <h2 className="text-xl font-bold mb-4">Top Pro Traders</h2>
                  <div className="space-y-4">
                    {proTraders.map((trader) => (
                      <Card 
                        key={trader.id}
                        className={`cursor-pointer transition-all ${
                          selectedTrader.id === trader.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedTrader(trader)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{trader.name}</h3>
                            <Badge className="bg-green-500/20 text-green-400">{trader.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{trader.strategy}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Return:</span>
                              <span className="text-green-400 ml-1">+{trader.totalReturn}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Drawdown:</span>
                              <span className="text-red-400 ml-1">{trader.maxDrawdown}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Right: Selected Trader Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Header */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h1 className="text-3xl mb-2">{selectedTrader.name}</h1>
                          <h2 className="text-xl text-muted-foreground">{selectedTrader.strategy}</h2>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {selectedTrader.status}
                        </Badge>
                      </div>
                      
                      <Dialog open={copyModalOpen} onOpenChange={setCopyModalOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy This Strategy
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Copy Trading Strategy</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Investment Amount</Label>
                              <Input
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                                placeholder="Enter amount"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={autoInvest}
                                onCheckedChange={setAutoInvest}
                              />
                              <Label>Auto-Invest Dividends/Profits</Label>
                            </div>
                            <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                              <div className="flex justify-between">
                                <span>Investment Amount:</span>
                                <span>${investmentAmount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Performance Fee ({selectedTrader.performanceFee}%):</span>
                                <span>${calculateFee(investmentAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Required Margin:</span>
                                <span>${calculateMargin(investmentAmount)}</span>
                              </div>
                            </div>
                            <Button onClick={handleConfirmCopyTrade} className="w-full">
                              Confirm Copy Trade & Invest
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Return</p>
                            <p className="text-2xl text-green-400">+{selectedTrader.totalReturn}%</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Max Drawdown</p>
                            <p className="text-2xl text-red-400">{selectedTrader.maxDrawdown}%</p>
                          </div>
                          <TrendingDown className="w-8 h-8 text-red-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Performance Fee</p>
                            <p className="text-lg">{selectedTrader.performanceFee}% of Profits</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Transparency */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Transparency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Pro Trader Capital</p>
                          <p className="text-xl text-cyan-400">${selectedTrader.traderCapital.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Follower Capital</p>
                          <p className="text-xl text-cyan-400">${selectedTrader.followerCapital.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Strategy Performance (12 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={equityData}>
                            <defs>
                              <linearGradient id="strategyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#10B981" />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="5 5" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="url(#strategyGradient)" 
                              strokeWidth={3}
                              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Pattern-to-Algo Tab */}
            <TabsContent value="pattern-algo" className="flex-1 m-0 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Pattern-to-Algo Converter (P.A.C.)</h1>
                  <p className="text-muted-foreground">Convert your trading patterns into automated strategies with advanced risk management</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Step 1: Capture Pattern */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                        Capture Pattern
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={handleCapturePoint}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                      >
                        Capture Entry Point
                      </Button>
                      {selectedPoint && (
                        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded">
                          <p className="text-sm text-green-400">Selected Point: {selectedPoint}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Step 2: Define Entry Logic */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                        Define Entry Logic (No-Code)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="StockPrice" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="price">StockPrice</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                              <SelectItem value="rsi">RSI(14)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="CrossesAbove" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="above">CrossesAbove</SelectItem>
                              <SelectItem value="below">CrossesBelow</SelectItem>
                              <SelectItem value="equals">Equals</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="EMA(50)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ema50">EMA(50)</SelectItem>
                            <SelectItem value="sma20">SMA(20)</SelectItem>
                            <SelectItem value="rsi30">RSI &lt; 30</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddRule} className="w-full" variant="outline">
                        Add Rule
                      </Button>
                      {entryRules.length > 0 && (
                        <div className="space-y-2">
                          {entryRules.map((rule) => (
                            <div key={rule.id} className="p-2 bg-muted/20 rounded text-sm">
                              {rule.condition}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Step 3: Define Exit & Risk */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                        Define Exit & Risk
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Stop Loss</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              value={stopLoss}
                              onChange={(e) => setStopLoss(e.target.value)}
                              placeholder="2.0"
                              className="flex-1"
                            />
                            <span className="text-sm">x ATR(14)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="atr-stop"
                              checked={atrStopLoss}
                              onCheckedChange={setAtrStopLoss}
                            />
                            <Label htmlFor="atr-stop" className="text-xs">Use ATR for dynamic stops</Label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Take Profit</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">Ratio:</span>
                            <Input
                              value={takeProfit}
                              onChange={(e) => setTakeProfit(e.target.value)}
                              placeholder="3.0"
                              className="flex-1"
                            />
                            <span className="text-sm">x InitialStopLoss</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="time-exit" 
                              checked={timeBasedExit}
                              onCheckedChange={setTimeBasedExit}
                            />
                            <Label htmlFor="time-exit" className="text-sm">Time-Based Exit</Label>
                          </div>
                          {timeBasedExit && (
                            <div className="flex items-center space-x-2 ml-6">
                              <span className="text-xs">Exit if trade lasts longer than</span>
                              <Input
                                value={timeBasedCandles}
                                onChange={(e) => setTimeBasedCandles(e.target.value)}
                                placeholder="5"
                                className="w-16"
                              />
                              <span className="text-xs">candles</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 4: Backtest & Review */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                        Backtest & Review
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={handleRunBacktest}
                        className="w-full bg-purple-500 hover:bg-purple-600"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Run Backtest (Last 5 Years)
                      </Button>
                      
                      {backtestResults && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="p-3 bg-muted/20 rounded">
                              <p className="text-xs text-muted-foreground">Win Rate</p>
                              <p className="text-green-400 font-semibold">{backtestResults.winRate}%</p>
                            </div>
                            <div className="p-3 bg-muted/20 rounded">
                              <p className="text-xs text-muted-foreground">Profit Factor</p>
                              <p className="text-cyan-400 font-semibold">{backtestResults.profitFactor}</p>
                            </div>
                            <div className="p-3 bg-muted/20 rounded">
                              <p className="text-xs text-muted-foreground">Max Drawdown</p>
                              <p className="text-red-400 font-semibold">{backtestResults.maxDrawdown}%</p>
                            </div>
                            <div className={`p-3 rounded ${riskCompliant ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                              <p className="text-xs text-muted-foreground">R:R Ratio</p>
                              <p className={`font-semibold ${riskCompliant ? 'text-green-400' : 'text-red-400'}`}>
                                {backtestResults.rrRatio}:1 {riskCompliant ? '✓' : '✗'}
                              </p>
                            </div>
                          </div>
                          
                          {!riskCompliant && (
                            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded">
                              <p className="text-xs text-red-400">⚠️ Risk-to-Reward ratio must be ≥2:1 for compliance</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Deploy Buttons */}
                <div className="flex gap-4 max-w-md mx-auto">
                  <Button 
                    onClick={handleDeployPaper}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Deploy LIVE (Paper Trading)
                  </Button>
                  <Button 
                    onClick={handleDeployLive}
                    className={`flex-1 ${riskCompliant ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'}`}
                    disabled={!riskCompliant}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Deploy LIVE (Real Money)
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="flex-1 m-0 p-6">
              <div className="text-center py-20">
                <PieChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Portfolio Dashboard</h2>
                <p className="text-muted-foreground">Your trading portfolio and strategy performance will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
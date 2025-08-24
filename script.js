
        document.addEventListener('DOMContentLoaded', function() {
            // Navigation
            const navLinks = document.querySelectorAll('.nav-link');
            const pageSections = document.querySelectorAll('.page-section');
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            // Handle navigation clicks
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetPage = this.getAttribute('data-page');
                    
                    // Update active navigation link
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Show the target page
                    pageSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    document.getElementById(targetPage).classList.add('active');
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('show');
                });
            });
            
            // Mobile menu toggle
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('show');
            });
            
            // Quiz data for each section
            const quizData = {
                'case-study': [
                    {
                        question: "What technology allows paralyzed patients to control robotic limbs with their thoughts?",
                        options: [
                            "Magnetic Resonance Imaging (MRI)",
                            "Brain-Computer Interfaces (BCI)",
                            "Electroconvulsive Therapy (ECT)",
                            "Positron Emission Tomography (PET)"
                        ],
                        correct: "b"
                    },
                    {
                        question: "Which company has developed advanced neural interfaces for medical applications?",
                        options: [
                            "Neuralink",
                            "Google Brain",
                            "DeepMind",
                            "OpenAI"
                        ],
                        correct: "a"
                    },
                    {
                        question: "What is the main challenge in developing brain-computer interfaces?",
                        options: [
                            "Interpreting complex neural signals",
                            "Preventing brain damage during implantation",
                            "Making devices affordable",
                            "Preventing wireless interference"
                        ],
                        correct: "a"
                    },
                    {
                        question: "Which neurological condition has been treated using deep brain stimulation?",
                        options: [
                            "Parkinson's disease",
                            "Diabetes",
                            "Arthritis",
                            "Asthma"
                        ],
                        correct: "a"
                    },
                    {
                        question: "What field combines neuroscience with artificial intelligence?",
                        options: [
                            "Neuroprosthetics",
                            "Computational neuroscience",
                            "Neuroeconomics",
                            "Social neuroscience"
                        ],
                        correct: "b"
                    }
                ],
                'research': [
                    {
                        question: "What term describes the brain's ability to form new neural connections throughout life?",
                        options: [
                            "Neurogenesis",
                            "Neuroplasticity",
                            "Neural Darwinism",
                            "Neurotransmission"
                        ],
                        correct: "b"
                    },
                    {
                        question: "Which sleep stage is most important for memory consolidation?",
                        options: [
                            "REM sleep",
                            "Light sleep",
                            "Deep sleep (NREM)",
                            "Wakefulness"
                        ],
                        correct: "c"
                    },
                    {
                        question: "What is the primary function of myelin in the nervous system?",
                        options: [
                            "To transmit electrical signals",
                            "To insulate axons and speed up signal transmission",
                            "To provide nutrients to neurons",
                            "To remove waste products"
                        ],
                        correct: "b"
                    },
                    {
                        question: "Which neurotransmitter is primarily associated with reward and pleasure?",
                        options: [
                            "Serotonin",
                            "Dopamine",
                            "Acetylcholine",
                            "GABA"
                        ],
                        correct: "b"
                    },
                    {
                        question: "What technique allows researchers to visualize brain activity in real-time?",
                        options: [
                            "fMRI",
                            "EEG",
                            "PET scan",
                            "All of the above"
                        ],
                        correct: "d"
                    }
                ],
                'simulations': [
                    {
                        question: "What does fMRI measure to track brain activity?",
                        options: [
                            "Electrical activity directly from neurons",
                            "Changes in blood flow and oxygenation",
                            "Temperature variations in brain regions",
                            "Chemical composition of cerebrospinal fluid"
                        ],
                        correct: "b"
                    },
                    {
                        question: "What is the resting membrane potential of a typical neuron?",
                        options: [
                            "-40 mV",
                            "-70 mV",
                            "+30 mV",
                            "0 mV"
                        ],
                        correct: "b"
                    },
                    {
                        question: "Which technique allows for precise activation of specific neurons?",
                        options: [
                            "Optogenetics",
                            "Electroencephalography",
                            "Transcranial magnetic stimulation",
                            "Magnetoencephalography"
                        ],
                        correct: "a"
                    },
                    {
                        question: "What is the purpose of a computational neural simulation?",
                        options: [
                            "To predict weather patterns",
                            "To model the behavior of neural systems",
                            "To simulate gravitational waves",
                            "To design better computer hardware"
                        ],
                        correct: "b"
                    },
                    {
                        question: "Which brain simulation project aims to create a full human brain model?",
                        options: [
                            "Human Connectome Project",
                            "Blue Brain Project",
                            "Brain Initiative",
                            "ENIGMA Consortium"
                        ],
                        correct: "b"
                    }
                ]
            };

            // Application card click handling
            const learnMoreButtons = document.querySelectorAll('.learn-more');
            const appDetails = document.querySelectorAll('.app-detail');
            const closeButtons = document.querySelectorAll('.close-detail');
            
            learnMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const appType = this.getAttribute('data-app');
                    
                    // Hide all details first
                    appDetails.forEach(detail => {
                        detail.classList.remove('active');
                    });
                    
                    // Show the selected detail
                    document.getElementById(`${appType}-detail`).classList.add('active');
                    
                    // Initialize quiz for this section
                    initQuiz(appType);
                    
                    // Scroll to the detail section
                    document.getElementById(`${appType}-detail`).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Close detail buttons
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    this.parentElement.parentElement.classList.remove('active');
                });
            });
            
            // Initialize quiz for a section
            function initQuiz(section) {
                const questions = quizData[section];
                let currentQuestion = 0;
                let score = 0;
                let userAnswers = [];
                
                const progressBar = document.getElementById(`${section}-progress`);
                const questionElement = document.getElementById(`${section}-question`);
                const optionsElement = document.getElementById(`${section}-options`);
                const prevButton = document.getElementById(`prev-${section}`);
                const nextButton = document.getElementById(`next-${section}`);
                const resultElement = document.getElementById(`${section}-result`);
                const recommendationsElement = document.getElementById(`${section}-recommendations`);
                
                // Load question
                function loadQuestion() {
                    // Update progress bar
                    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
                    
                    // Display current question
                    questionElement.textContent = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;
                    
                    // Display options
                    optionsElement.innerHTML = '';
                    questions[currentQuestion].options.forEach((option, index) => {
                        const li = document.createElement('li');
                        li.textContent = `${String.fromCharCode(97 + index)}) ${option}`;
                        li.setAttribute('data-value', String.fromCharCode(97 + index));
                        optionsElement.appendChild(li);
                    });
                    
                    // Set up option selection
                    const options = optionsElement.querySelectorAll('li');
                    options.forEach(option => {
                        option.addEventListener('click', function() {
                            // Remove selected class from all options
                            options.forEach(opt => opt.classList.remove('selected'));
                            
                            // Add selected class to clicked option
                            this.classList.add('selected');
                            
                            // Store user's answer
                            userAnswers[currentQuestion] = this.getAttribute('data-value');
                            
                            // Enable next button
                            nextButton.disabled = false;
                        });
                    });
                    
                    // Update navigation buttons
                    prevButton.disabled = currentQuestion === 0;
                    
                    if (currentQuestion === questions.length - 1) {
                        nextButton.textContent = 'Finish Quiz';
                    } else {
                        nextButton.textContent = 'Next Question';
                    }
                    
                    // Hide result and recommendations
                    resultElement.classList.remove('active');
                    recommendationsElement.classList.remove('active');
                }
                
                // Check answer
                function checkAnswer() {
                    const selectedOption = optionsElement.querySelector('.selected');
                    if (!selectedOption) return false;
                    
                    const userAnswer = selectedOption.getAttribute('data-value');
                    const correctAnswer = questions[currentQuestion].correct;
                    
                    if (userAnswer === correctAnswer) {
                        score++;
                        selectedOption.classList.add('correct');
                        return true;
                    } else {
                        selectedOption.classList.add('incorrect');
                        // Highlight correct answer
                        optionsElement.querySelector(`[data-value="${correctAnswer}"]`).classList.add('correct');
                        return false;
                    }
                }
                
                // Show results
                function showResults() {
                    progressBar.style.width = '100%';
                    questionElement.textContent = `Quiz Complete! You scored ${score} out of ${questions.length}`;
                    optionsElement.innerHTML = '';
                    
                    // Determine result message
                    const percentage = (score / questions.length) * 100;
                    let message, resultClass;
                    
                    if (percentage >= 80) {
                        message = 'Excellent! You have a strong understanding of this topic.';
                        resultClass = 'result-success';
                    } else if (percentage >= 60) {
                        message = 'Good job! You have a solid foundation but there is more to learn.';
                        resultClass = 'result-warning';
                    } else {
                        message = 'Keep learning! Review the materials and try again.';
                        resultClass = 'result-info';
                    }
                    
                    resultElement.textContent = message;
                    resultElement.className = `quiz-result active ${resultClass}`;
                    
                    // Show recommendations
                    recommendationsElement.classList.add('active');
                    
                    // Update navigation buttons
                    prevButton.disabled = false;
                    nextButton.style.display = 'none';
                }
                
                // Set up event listeners for navigation buttons
                prevButton.addEventListener('click', function() {
                    if (currentQuestion > 0) {
                        currentQuestion--;
                        loadQuestion();
                        
                        // Restore previous selection if exists
                        if (userAnswers[currentQuestion]) {
                            const options = optionsElement.querySelectorAll('li');
                            options.forEach(option => {
                                if (option.getAttribute('data-value') === userAnswers[currentQuestion]) {
                                    option.classList.add('selected');
                                }
                            });
                        }
                    }
                });
                
                nextButton.addEventListener('click', function() {
                    // Check answer on next click (except for first question when no selection made yet)
                    if (userAnswers[currentQuestion] !== undefined) {
                        checkAnswer();
                        
                        // Disable next button briefly to show result
                        nextButton.disabled = true;
                        
                        setTimeout(() => {
                            if (currentQuestion < questions.length - 1) {
                                currentQuestion++;
                                loadQuestion();
                                
                                // Restore previous selection if exists
                                if (userAnswers[currentQuestion]) {
                                    const options = optionsElement.querySelectorAll('li');
                                    options.forEach(option => {
                                        if (option.getAttribute('data-value') === userAnswers[currentQuestion]) {
                                            option.classList.add('selected');
                                        }
                                    });
                                }
                            } else {
                                showResults();
                            }
                        }, 1000);
                    }
                });
                
                // Initialize the quiz
                loadQuestion();
            }
            
            // Contact form handling
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                });
            }
        });

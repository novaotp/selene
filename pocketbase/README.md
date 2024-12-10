# Extended Pocketbase

Selene uses pocketbase as a BaaS for handling authentication, file uploads, jobs scheduling and more.

To fit our needs, we are using it as a Go framework.

## Getting Started

### Prerequisites

- Go v1.23+

### Installation

1. Install the dependencies.

    ```bash
    go mod tidy
    ```

1. Install air to watch for file changes.

    ```bash
    go install github.com/air-verse/air@latest
    ```

1. Run the development server.

    ```bash
    air serve
    ```

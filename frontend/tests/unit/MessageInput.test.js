import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageInput from '../../src/components/MessageInput';

describe('MessageInput', () => {
  const mockOnSend = jest.fn();

  beforeEach(() => {
    mockOnSend.mockClear();
  });

  test('renders textarea and send button', () => {
    render(<MessageInput onSend={mockOnSend} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('updates textarea value on change', async () => {
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello world');
    expect(textarea).toHaveValue('Hello world');
  });

  test('calls onSend with correct message on send button click', async () => {
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.type(textarea, 'Test message');
    await user.click(sendButton);
    expect(mockOnSend).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: 'Test message',
      sender: 'You',
      timestamp: expect.any(String),
    });
    expect(textarea).toHaveValue('');
  });

  test('calls onSend on Enter key press', async () => {
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Enter message{enter}');
    expect(mockOnSend).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: 'Enter message',
      sender: 'You',
      timestamp: expect.any(String),
    });
  });

  test('does not call onSend on Shift+Enter', async () => {
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Shift enter{shift>}{enter}{/shift}');
    expect(mockOnSend).not.toHaveBeenCalled();
  });

  test('does not send empty or whitespace-only messages', async () => {
    const user = userEvent.setup();
    render(<MessageInput onSend={mockOnSend} />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.click(sendButton);
    expect(mockOnSend).not.toHaveBeenCalled();
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, '   ');
    await user.click(sendButton);
    expect(mockOnSend).not.toHaveBeenCalled();
  });
});